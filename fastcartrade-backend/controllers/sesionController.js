const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Usuario = require("../model/Usuario");
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta";

const sesionController = {
  // GET /
  inicio: (req, res) => {
    res.redirect("http://localhost:4200");
  },

  // POST /api/sesion/registro
  registro: async (req, res) => {
    const { nombre, correo, password, rol } = req.body;  
    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    try {
      const existe = await Usuario.findOne({ where: { correo } });
      if (existe) {
        return res.status(409).json({ error: "El usuario ya existe" });
      }

      const hash = await bcrypt.hash(password, 10);
      const nuevoUsuario = await Usuario.create({ 
        nombre, 
        correo, 
        password: hash,
        rol: rol || 'comprador'
      });

      // Generar el token para autenticar automáticamente al usuario después del registro
      const token = jwt.sign(
        { 
          id: nuevoUsuario.id, 
          nombre: nuevoUsuario.nombre,
          correo: nuevoUsuario.correo,
          rol: nuevoUsuario.rol
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(201).json({
        mensaje: "Usuario registrado",
        token,
        usuario: { 
          id: nuevoUsuario.id, 
          nombre, 
          correo,
          rol: nuevoUsuario.rol
        }
      });
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  },

  // POST /api/sesion/login
  login: async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
      const usuario = await Usuario.findOne({ where: { correo } });
      if (!usuario) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      // Verificar si el usuario está activo
      if (!usuario.activo) {
        return res.status(403).json({ error: "Esta cuenta ha sido desactivada" });
      }

      const coincide = await bcrypt.compare(password, usuario.password);
      if (!coincide) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        { 
          id: usuario.id, 
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol
        }, 
        JWT_SECRET, 
        { expiresIn: "1d" }
      );

      res.json({ 
        mensaje: "Inicio de sesión exitoso", 
        token, 
        usuario: { 
          id: usuario.id, 
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol
        } 
      });
    } catch (err) {
      console.error("Error en el login:", err);
      res.status(500).json({ error: "Error en el login" });
    }
  },

  // POST /api/sesion/logout
  logout: (req, res) => {
    res.json({ mensaje: "Sesión cerrada correctamente" });
  }
};

module.exports = sesionController;

