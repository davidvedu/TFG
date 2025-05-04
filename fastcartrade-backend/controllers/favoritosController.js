// controllers/favoritosController.js
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const Usuario = require('../model/Usuario');
const Anuncio = require('../model/Anuncio');
const Favorito = require('../model/Favorito');

module.exports = {
  // Agregar un anuncio a favoritos
  agregarFavorito: async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioId = req.user.id;

      // Verificar que el anuncio existe
      const anuncio = await Anuncio.findByPk(id, { transaction: t });
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      // Verificar que el usuario no es el vendedor
      if (anuncio.vendedor_id === usuarioId) {
        return res.status(400).json({ error: 'No puedes agregar tu propio anuncio a favoritos' });
      }

      // Verificar que no está ya en favoritos
      const favoritoExistente = await Favorito.findOne({
        where: {
          usuario_id: usuarioId,
          anuncio_id: id
        },
        transaction: t
      });

      if (favoritoExistente) {
        return res.status(400).json({ error: 'Este anuncio ya está en tus favoritos' });
      }

      // Agregar a favoritos
      await Favorito.create({
        usuario_id: usuarioId,
        anuncio_id: id,
        fecha: new Date()
      }, { transaction: t });

      res.status(201).json({ mensaje: 'Anuncio agregado a favoritos exitosamente' });
    } catch (error) {
      console.error('Error al agregar favorito:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Eliminar favorito
  eliminarFavorito: async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioId = req.user.id;

      const favorito = await Favorito.findOne({
        where: {
          usuario_id: usuarioId,
          anuncio_id: id
        },
        transaction: t
      });

      if (!favorito) {
        return res.status(404).json({ error: 'Favorito no encontrado' });
      }

      await favorito.destroy({ transaction: t });
      
      res.json({ mensaje: 'Favorito eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Listar todos los favoritos del usuario
  listarFavoritos: async (req, res) => {
    try {
      const { limit = 10, offset = 0 } = req.query;

      const favoritos = await Favorito.findAndCountAll({
        where: { usuario_id: req.user.id },
        include: [{
          model: Anuncio,
          include: [{
            model: Vehiculo,
            attributes: ['matricula', 'modelo_id', 'estado_vehiculo', 'anio', 'kilometros']
          }, {
            model: Usuario,
            as: 'vendedor',
            attributes: ['id', 'nombre', 'foto']
          }]
        }],
        order: [['fecha', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        total: favoritos.count,
        favoritos: favoritos.rows.map(f => f.Anuncio)
      });
    } catch (error) {
      console.error('Error al listar favoritos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};
