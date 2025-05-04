const { Op } = require('sequelize');
const Usuario = require('../model/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const sendEmail = require('../utils/sendEmail');

module.exports = {
  inicio: async (req, res) => {
    try {
      res.redirect('http://localhost:4200');
    } catch (error) {
      console.error('Error al redirigir al frontend:', error);
      res.status(500).send('Error interno del servidor');
    }
  },

  validarToken: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(403).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
      }

      req.user = decoded;
      next();
    });
  },

  registro: async (req, res) => {
    try {
      const { nombre, correo, password, rol } = req.body;

      if (!nombre || !correo || !password) {
        return res.status(400).json({ error: 'Nombre, correo y contraseña son obligatorios.' });
      }

      if (password.length < 8) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
      }

      const usuarioExistente = await Usuario.findOne({ where: { correo } });
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El correo ya está registrado.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const nuevoUsuario = await Usuario.create({
        nombre,
        correo,
        password: hashedPassword,
        rol: rol || 'comprador',
        foto: 'default.jpg',
        activo: true
      });

      const token = jwt.sign(
        { id: nuevoUsuario.id, rol: nuevoUsuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        mensaje: 'Usuario registrado exitosamente.',
        token,
        usuario: {
          id: nuevoUsuario.id,
          nombre,
          correo,
          rol: nuevoUsuario.rol
        }
      });

    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  },

  login: async (req, res) => {
    try {
      const { correo, password } = req.body;

      if (!correo || !password) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const usuario = await Usuario.findOne({ where: { correo } });
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const esValida = await bcrypt.compare(password, usuario.password);
      if (!esValida) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      if (!usuario.activo) {
        return res.status(403).json({ error: 'Tu cuenta está desactivada' });
      }

      const token = jwt.sign(
        { id: usuario.id, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      await usuario.update({ ultima_conexion: new Date() });

      res.json({
        token,
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol,
          foto: usuario.foto
        }
      });
    } catch (error) {
      console.error('Error en el login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  logout: async (req, res) => {
    try {
      res.json({ mensaje: "Sesión cerrada exitosamente" });
    } catch (error) {
      console.error('Error en el logout:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  recuperarPassword: async (req, res) => {
    try {
      const { correo } = req.body;

      if (!correo) {
        return res.status(400).json({ error: 'Se requiere el correo' });
      }

      const usuario = await Usuario.findOne({ where: { correo } });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const token = jwt.sign(
        { id: usuario.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      await usuario.update({
        token_recuperacion: token,
        token_recuperacion_expira: new Date(Date.now() + 3600000)
      });

      // await sendEmail({
      //   to: correo,
      //   subject: 'Recuperación de contraseña',
      //   html: `
      //     <h1>Recuperación de contraseña</h1>
      //     <p>Para recuperar tu contraseña, haz clic en el siguiente enlace:</p>
      //     <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Recuperar contraseña</a>
      //     <p>Este enlace expirará en 1 hora.</p>
      //   `
      // });

      res.json({ mensaje: 'Se ha enviado un correo con las instrucciones para recuperar tu contraseña' });
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;

      if (!token || !password) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      if (password.length < 8) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
      }

      const usuario = await Usuario.findOne({
        where: {
          token_recuperacion: token,
          token_recuperacion_expira: { [Op.gt]: new Date() }
        }
      });

      if (!usuario) {
        return res.status(400).json({ error: 'Token inválido o expirado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await usuario.update({
        password: hashedPassword,
        token_recuperacion: null,
        token_recuperacion_expira: null
      });

      res.json({ mensaje: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error('Error al resetear contraseña:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  borraCuenta: async (req, res) => {
    try {
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({ error: 'Se requiere la contraseña' });
      }

      const usuario = await Usuario.findByPk(req.user.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const esValida = await bcrypt.compare(password, usuario.password);
      if (!esValida) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      await usuario.update({
        activo: false,
        fecha_eliminacion: new Date()
      });

      res.json({ mensaje: 'Cuenta eliminada exitosamente' });
    } catch (error) {
      console.error('Error al eliminar cuenta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};
