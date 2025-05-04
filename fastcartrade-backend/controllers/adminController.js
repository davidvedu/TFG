// controllers/adminController.js
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('../model/Usuario');
const Anuncio = require('../model/Anuncio');
const Comentario = require('../model/Comentario');

module.exports = {
  // Listar usuarios reportados (este stub asume que existe un flag o tabla de reportes)
  listarUsuariosReportados: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll({
        where: { 
          reportado: true,
          bloqueado: false 
        },
        attributes: ['id', 'nombre', 'correo', 'rol', 'fecha']
      });
      res.json(usuarios);
    } catch (error) {
      console.error('Error al listar usuarios reportados:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Bloquear un usuario
  bloquearUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { motivo } = req.body;

      if (!motivo) {
        return res.status(400).json({ error: 'Se requiere un motivo para bloquear al usuario' });
      }

      const usuario = await Usuario.findByPk(id, { transaction: t });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      await usuario.update({ 
        bloqueado: true,
        motivo_bloqueo: motivo,
        fecha_bloqueo: new Date()
      }, { transaction: t });

      res.json({ mensaje: 'Usuario bloqueado exitosamente' });
    } catch (error) {
      console.error('Error al bloquear usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Eliminar un usuario
  eliminarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id, { transaction: t });
      
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Primero eliminamos los anuncios del usuario
      await Anuncio.destroy({ 
        where: { vendedor_id: id },
        transaction: t 
      });

      // Luego eliminamos los comentarios
      await Comentario.destroy({
        where: { 
          [Op.or]: [
            { comprador_id: id },
            { vendedor_id: id }
          ]
        },
      });

      // Finalmente eliminamos el usuario
      await usuario.destroy({ transaction: t });
      
      res.json({ mensaje: 'Usuario y sus datos relacionados eliminados exitosamente' });
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Listar anuncios reportados
  listarAnunciosReportados: async (req, res) => {
    try {
      const anuncios = await Anuncio.findAll({
        where: { 
          reportado: true,
          estado: 'activo'
        },
        include: [{
          model: Usuario,
          attributes: ['id', 'nombre', 'correo']
        }]
      });
      res.json(anuncios);
    } catch (error) {
      console.error('Error al listar anuncios reportados:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Eliminar un anuncio reportado
  eliminarAnuncio: async (req, res) => {
    try {
      const { id } = req.params;
      const anuncio = await Anuncio.findByPk(id, { transaction: t });
      
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      // Eliminamos los comentarios asociados
      await Comentario.destroy({
        where: { anuncio_id: id },
      });

      await anuncio.destroy({ transaction: t });
      
      res.json({ mensaje: 'Anuncio eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar anuncio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Listar comentarios reportados
  listarComentariosReportados: async (req, res) => {
    try {
      const comentarios = await Comentario.findAll({
        where: { reportado: true },
        include: [{
          model: Usuario,
          as: 'comprador',
          attributes: ['id', 'nombre']
        }, {
          model: Usuario,
          as: 'vendedor',
          attributes: ['id', 'nombre']
        }]
      });
      res.json(comentarios);
    } catch (error) {
      console.error('Error al listar comentarios reportados:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Eliminar un comentario reportado
  eliminarComentario: async (req, res) => {
    try {
      const { id } = req.params;
      const comentario = await Comentario.findByPk(id, { transaction: t });
      
      if (!comentario) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }

      await comentario.destroy({ transaction: t });
      
      res.json({ mensaje: 'Comentario eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Aprobar anuncio reportado (cambiar algún flag de estado)
  aprobarAnuncio: async (req, res) => {
    try {
      const { id } = req.params;
      const anuncio = await Anuncio.findByPk(id, { transaction: t });
      
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      await anuncio.update({ 
        aprobado: true,
        reportado: false,
        fecha_aprobacion: new Date()
      }, { transaction: t });
      
      res.json({ mensaje: 'Anuncio aprobado exitosamente' });
    } catch (error) {
      console.error('Error al aprobar anuncio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Rechazar anuncio reportado
  rechazarAnuncio: async (req, res) => {
    try {
      const { id } = req.params;
      const { motivo } = req.body;

      if (!motivo) {
        return res.status(400).json({ error: 'Se requiere un motivo para rechazar el anuncio' });
      }

      const anuncio = await Anuncio.findByPk(id, { transaction: t });
      
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      await anuncio.update({ 
        aprobado: false,
        reportado: false,
        motivo_rechazo: motivo,
        fecha_rechazo: new Date()
      }, { transaction: t });
      
      res.json({ mensaje: 'Anuncio rechazado exitosamente' });
    } catch (error) {
      console.error('Error al rechazar anuncio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};
