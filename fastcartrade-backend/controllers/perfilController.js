const Usuario = require('../model/Usuario');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = {
  // Obtener perfil completo del usuario
  obtenerPerfilCompleto: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: usuarioSolicitante } = req.usuario;

      // Verificar permisos (solo el propio usuario o un admin pueden ver el perfil completo)
      if (parseInt(id) !== usuarioSolicitante && req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'No tienes permiso para ver este perfil' });
      }

      const usuario = await Usuario.findByPk(id, {
        attributes: ['id', 'nombre', 'correo', 'rol', 'foto', 'telefono', 'fecha_registro']
      });

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json(usuario);
    } catch (error) {
      console.error('Error al obtener perfil completo:', error);
      res.status(500).json({ error: 'Error al obtener el perfil completo del usuario' });
    }
  },

  // Actualizar foto de perfil
  actualizarFotoPerfil: async (req, res) => {
    try {
      const { id } = req.params;
      const { foto } = req.body;
      const { id: usuarioSolicitante } = req.usuario;

      // Verificar permisos
      if (parseInt(id) !== usuarioSolicitante && req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'No tienes permiso para modificar este perfil' });
      }

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Actualizar foto
      usuario.foto = foto;
      await usuario.save();

      res.json({
        mensaje: 'Foto de perfil actualizada correctamente',
        foto: usuario.foto
      });
    } catch (error) {
      console.error('Error al actualizar foto de perfil:', error);
      res.status(500).json({ error: 'Error al actualizar la foto de perfil' });
    }
  },

  // Actualizar información de contacto
  actualizarContacto: async (req, res) => {
    try {
      const { id } = req.params;
      const { telefono } = req.body;
      const { id: usuarioSolicitante } = req.usuario;

      // Verificar permisos
      if (parseInt(id) !== usuarioSolicitante && req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'No tienes permiso para modificar este perfil' });
      }

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Actualizar teléfono
      if (telefono) usuario.telefono = telefono;
      await usuario.save();

      res.json({
        mensaje: 'Información de contacto actualizada correctamente',
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          telefono: usuario.telefono
        }
      });
    } catch (error) {
      console.error('Error al actualizar información de contacto:', error);
      res.status(500).json({ error: 'Error al actualizar la información de contacto' });
    }
  },

  // Actualizar perfil completo
  actualizarPerfil: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, correo, telefono, foto } = req.body;
      const { id: usuarioSolicitante } = req.usuario;

      // Verificar permisos
      if (parseInt(id) !== usuarioSolicitante && req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'No tienes permiso para modificar este perfil' });
      }

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Actualizar datos
      if (nombre) usuario.nombre = nombre;
      if (correo) usuario.correo = correo;
      if (telefono) usuario.telefono = telefono;
      if (foto) usuario.foto = foto;
      
      await usuario.save();

      res.json({
        mensaje: 'Perfil actualizado correctamente',
        usuario: {
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.correo,
          telefono: usuario.telefono,
          foto: usuario.foto,
          rol: usuario.rol
        }
      });
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      res.status(500).json({ error: 'Error al actualizar el perfil del usuario' });
    }
  },

  // Cambiar contraseña
  cambiarPassword: async (req, res) => {
    try {
      const { id } = req.params;
      const { passwordActual, passwordNueva } = req.body;
      const { id: usuarioSolicitante } = req.usuario;

      // Verificar permisos
      if (parseInt(id) !== usuarioSolicitante) {
        return res.status(403).json({ error: 'No tienes permiso para cambiar la contraseña de este usuario' });
      }

      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Verificar contraseña actual
      const passwordValida = await usuario.validarPassword(passwordActual);
      if (!passwordValida) {
        return res.status(400).json({ error: 'La contraseña actual es incorrecta' });
      }

      // Actualizar contraseña
      usuario.password = passwordNueva;
      await usuario.save();

      res.json({
        mensaje: 'Contraseña actualizada correctamente'
      });
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
  }
};