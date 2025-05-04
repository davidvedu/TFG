// controllers/perfilController.js
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('../model/Usuario');
const bcrypt = require('bcryptjs');
const Anuncio = require('../model/Anuncio');

module.exports = {
  // Ver el perfil del usuario logueado
  verPerfil: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.user.id, {
        attributes: { exclude: ['password'] },
        include: [{
          model: Anuncio,
          as: 'anuncios',
          attributes: ['id', 'titulo', 'precio', 'estado', 'fecha_publicacion'],
          where: { estado: 'activo' },
          required: false
        }]
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json(usuario);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Cambiar foto de perfil
  cambiarFoto: async (req, res) => {
    try {
      const { foto } = req.body;

      if (!foto) {
        return res.status(400).json({ error: 'Se requiere una foto' });
      }

      const usuario = await Usuario.findByPk(req.user.id, { transaction: t });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      await usuario.update( foto );
      
      res.json({ mensaje: 'Foto de perfil actualizada exitosamente' });
    } catch (error) {
      console.error('Error al cambiar foto de perfil:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Cambiar rol (ej: de comprador a vendedor)
  cambiarRol: async (req, res) => {
    try {
      const { rol } = req.body;

      if (!rol || !['comprador', 'vendedor'].includes(rol)) {
        return res.status(400).json({ error: 'Rol inválido' });
      }

      const usuario = await Usuario.findByPk(req.user.id, { transaction: t });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      await usuario.update({ rol }, { transaction: t });
      
      res.json({ mensaje: 'Rol actualizado exitosamente' });
    } catch (error) {
      console.error('Error al cambiar rol:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  actualizarPerfil: async (req, res) => {
    try {
      const { nombre, correo, password_actual, password_nueva } = req.body;
      const usuario = await Usuario.findByPk(req.user.id, { transaction: t });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Validar contraseña actual si se quiere cambiar la contraseña
      if (password_nueva) {
        if (!password_actual) {
          return res.status(400).json({ error: 'Se requiere la contraseña actual' });
        }

        const esValida = await bcrypt.compare(password_actual, usuario.password);
        if (!esValida) {
          return res.status(400).json({ error: 'Contraseña actual incorrecta' });
        }

        // Hash de la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password_nueva, salt);
        usuario.password = hashedPassword;
      }

      // Actualizar otros campos
      if (nombre) usuario.nombre = nombre;
      if (correo) {
        // Verificar que el correo no está en uso
        const correoExistente = await Usuario.findOne({
          where: {
            correo,
            id: { [Op.ne]: usuario.id }
          },
          transaction: t
        });

        if (correoExistente) {
          return res.status(400).json({ error: 'El correo ya está en uso' });
        }
        usuario.correo = correo;
      }

      
      res.json({ mensaje: 'Perfil actualizado exitosamente' });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};
