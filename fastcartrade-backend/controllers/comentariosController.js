// controllers/comentariosController.js
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const Comentario = require('../model/Comentario');
const Anuncio = require('../model/Anuncio');
const Usuario = require('../model/Usuario');

module.exports = {
  // Dejar un comentario en un anuncio
  dejarComentario: async (req, res) => {
    try {
      const { comentario, valoracion, anuncio_id } = req.body;

      // Validaciones básicas
      if (!comentario || !valoracion || !anuncio_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      if (comentario.length > 500) {
        return res.status(400).json({ error: 'El comentario no puede exceder los 500 caracteres' });
      }

      if (valoracion < 1 || valoracion > 5) {
        return res.status(400).json({ error: 'La valoración debe estar entre 1 y 5' });
      }

      // Verificar que el anuncio existe
      const anuncio = await Anuncio.findByPk(anuncio_id, {  });
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      // Verificar que el usuario no es el vendedor
      if (anuncio.vendedor_id === req.user.id) {
        return res.status(403).json({ error: 'No puedes comentar en tu propio anuncio' });
      }

      // Verificar que el usuario no ha comentado antes
      const comentarioExistente = await Comentario.findOne({
        where: {
          anuncio_id,
          comprador_id: req.user.id
        },
        
      });

      if (comentarioExistente) {
        return res.status(400).json({ error: 'Ya has comentado en este anuncio' });
      }

      const nuevoComentario = await Comentario.create({
        comentario,
        valoracion,
        anuncio_id,
        comprador_id: req.user.id,
        vendedor_id: anuncio.vendedor_id,
        fecha: new Date()
      }, );

      res.status(201).json(nuevoComentario);
    } catch (error) {
      console.error('Error al crear comentario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Obtener comentarios hechos a un usuario (por ejemplo, como vendedor)
  getComentarios: async (req, res) => {
    try {
      const { idUsuario } = req.params;
      const { limit = 10, offset = 0 } = req.query;

      const comentarios = await Comentario.findAndCountAll({
        where: { vendedor_id: idUsuario },
        include: [{
          model: Usuario,
          as: 'comprador',
          attributes: ['id', 'nombre', 'foto']
        }, {
          model: Anuncio,
          attributes: ['id', 'titulo']
        }],
        order: [['fecha', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        total: comentarios.count,
        comentarios: comentarios.rows
      });
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  eliminarComentario: async (req, res) => {
    try {
      const { id } = req.params;

      const comentario = await Comentario.findByPk(id, {  });
      if (!comentario) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }

      // Verificar que el usuario es el autor del comentario o el vendedor
      if (comentario.comprador_id !== req.user.id && comentario.vendedor_id !== req.user.id) {
        return res.status(403).json({ error: 'No tienes permiso para eliminar este comentario' });
      }

      await comentario.destroy({  });
      
      res.json({ mensaje: 'Comentario eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  reportarComentario: async (req, res) => {
    try {
      const { id } = req.params;
      const { motivo } = req.body;

      if (!motivo) {
        return res.status(400).json({ error: 'Se requiere un motivo para reportar el comentario' });
      }

      const comentario = await Comentario.findByPk(id, {  });
      if (!comentario) {
        return res.status(404).json({ error: 'Comentario no encontrado' });
      }

      await comentario.update({
        reportado: true,
        motivo_reporte: motivo,
        fecha_reporte: new Date()
      });

      res.json({ mensaje: 'Comentario reportado exitosamente' });
    } catch (error) {
      console.error('Error al reportar comentario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};
