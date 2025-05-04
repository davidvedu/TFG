// controllers/anunciosController.js
const { Op } = require('sequelize');
const Anuncio = require('../model/Anuncio');
const Vehiculo = require('../model/Vehiculo');
const Comentario = require('../model/Comentario');

module.exports = {
  // Ver los anuncios del usuario logueado
  verMisAnuncios: async (req, res) => {
    try {
      const anuncios = await Anuncio.findAll({
        where: { vendedor_id: req.user.id },
        include: [{
          model: Vehiculo,
          attributes: ['matricula', 'modelo_id', 'estado_vehiculo', 'anio', 'kilometros']
        }],
        order: [['fecha_publicacion', 'DESC']]
      });
      res.json(anuncios);
    } catch (error) {
      console.error('Error al listar anuncios del usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Ver detalles de un anuncio en particular
  detalleAnuncio: async (req, res) => {
    try {
      const anuncio = await Anuncio.findByPk(req.params.id, {
        include: [{
          model: Vehiculo,
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        }, {
          model: Usuario,
          as: 'vendedor',
          attributes: ['id', 'nombre', 'correo', 'foto']
        }]
      });

      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      res.json(anuncio);
    } catch (error) {
      console.error('Error al obtener detalle del anuncio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Crear un nuevo anuncio
  crearAnuncio: async (req, res) => {
    try {
      const { titulo, descripcion, precio, vehiculo_id } = req.body;

      // Validaciones básicas
      if (!titulo || !descripcion || !precio || !vehiculo_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      if (precio <= 0) {
        return res.status(400).json({ error: 'El precio debe ser mayor a 0' });
      }

      // Verificar que el vehículo existe y pertenece al usuario
      const vehiculo = await Vehiculo.findByPk(vehiculo_id);
      if (!vehiculo) {
        return res.status(404).json({ error: 'Vehículo no encontrado' });
      }

      const anuncio = await Anuncio.create({
        titulo,
        descripcion,
        precio,
        vehiculo_id,
        vendedor_id: req.user.id,
        estado: 'activo'
      });

      res.status(201).json(anuncio);
    } catch (error) {
      console.error('Error al crear anuncio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Actualizar un anuncio existente
  setAnuncio: async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descripcion, precio } = req.body;

      const anuncio = await Anuncio.findByPk(id);
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      // Verificar que el usuario es el propietario del anuncio
      if (anuncio.vendedor_id !== req.user.id) {
        return res.status(403).json({ error: 'No tienes permiso para modificar este anuncio' });
      }

      // Validar campos
      if (precio && precio <= 0) {
        return res.status(400).json({ error: 'El precio debe ser mayor a 0' });
      }

      await anuncio.update({
        titulo: titulo || anuncio.titulo,
        descripcion: descripcion || anuncio.descripcion,
        precio: precio || anuncio.precio
      });

      res.json(anuncio);
    } catch (error) {
      console.error('Error al actualizar anuncio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Eliminar un anuncio
  borraAnuncio: async (req, res) => {
    try {
      const { id } = req.params;

      const anuncio = await Anuncio.findByPk(id, );
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      // Verificar que el usuario es el propietario del anuncio
      if (anuncio.vendedor_id !== req.user.id) {
        return res.status(403).json({ error: 'No tienes permiso para eliminar este anuncio' });
      }

      // Eliminar comentarios asociados
      await Comentario.destroy({
        where: { anuncio_id: id },
        transaction: t
      });

      await anuncio.destroy({ transaction: t });
      
      res.json({ mensaje: 'Anuncio eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar anuncio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Cambiar estado del anuncio a reservado
  setAnuncioReservado: async (req, res) => {
    try {
      const { id } = req.params;

      const anuncio = await Anuncio.findByPk(id);
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      // Verificar que el usuario es el propietario del anuncio
      if (anuncio.vendedor_id !== req.user.id) {
        return res.status(403).json({ error: 'No tienes permiso para modificar este anuncio' });
      }

      await anuncio.update({ 
        estado: 'reservado',
        fecha_reserva: new Date()
      });

      res.json({ mensaje: 'Anuncio marcado como reservado' });
    } catch (error) {
      console.error('Error al marcar anuncio como reservado:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Cambiar estado del anuncio a vendido
  setAnuncioVendido: async (req, res) => {
    try {
      const { id } = req.params;

      const anuncio = await Anuncio.findByPk(id);
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      // Verificar que el usuario es el propietario del anuncio
      if (anuncio.vendedor_id !== req.user.id) {
        return res.status(403).json({ error: 'No tienes permiso para modificar este anuncio' });
      }

      await anuncio.update({ 
        estado: 'vendido',
        fecha_venta: new Date()
      });

      res.json({ mensaje: 'Anuncio marcado como vendido' });
    } catch (error) {
      console.error('Error al marcar anuncio como vendido:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};
