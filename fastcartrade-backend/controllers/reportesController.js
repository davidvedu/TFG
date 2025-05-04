// controllers/reportesController.js
// Los reportes podrían guardarse en una tabla o enviarse por email para revisión
const { sequelize } = require('../config/database');
const Anuncio = require('../model/Anuncio');
const Usuario = require('../model/Usuario');

module.exports = {
    reportarAnuncio: async (req, res) => {
      try {
        const { anuncio_id, motivo, descripcion } = req.body;

        // Validaciones básicas
        if (!anuncio_id || !motivo || !descripcion) {
          return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        if (descripcion.length > 500) {
          return res.status(400).json({ error: 'La descripción no puede exceder los 500 caracteres' });
        }

        // Verificar que el anuncio existe
        const anuncio = await Anuncio.findByPk(anuncio_id, { transaction: t });
        if (!anuncio) {
          return res.status(404).json({ error: 'Anuncio no encontrado' });
        }

        // Verificar que no es el propio anuncio
        if (anuncio.vendedor_id === req.user.id) {
          return res.status(400).json({ error: 'No puedes reportar tu propio anuncio' });
        }

        // Verificar que no se ha reportado antes
        const reporteExistente = await Reporte.findOne({
          where: {
            tipo: 'anuncio',
            elemento_id: anuncio_id,
            usuario_id: req.user.id
          },
          transaction: t
        });

        if (reporteExistente) {
          return res.status(400).json({ error: 'Ya has reportado este anuncio' });
        }

        // Crear el reporte
        const reporte = await Reporte.create({
          tipo: 'anuncio',
          elemento_id: anuncio_id,
          usuario_id: req.user.id,
          motivo,
          descripcion,
          fecha: new Date(),
          estado: 'pendiente'
        }, { transaction: t });

        await t.commit();
        res.status(201).json(reporte);
      } catch (error) {
        await t.rollback();
        console.error('Error al reportar anuncio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    },
  
    reportarUsuario: async (req, res) => {
      try {
        const { usuario_id, motivo, descripcion } = req.body;

        // Validaciones básicas
        if (!usuario_id || !motivo || !descripcion) {
          return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        if (descripcion.length > 500) {
          return res.status(400).json({ error: 'La descripción no puede exceder los 500 caracteres' });
        }

        // Verificar que el usuario existe
        const usuario = await Usuario.findByPk(usuario_id, { transaction: t });
        if (!usuario) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar que no es el propio usuario
        if (usuario_id === req.user.id) {
          return res.status(400).json({ error: 'No puedes reportarte a ti mismo' });
        }

        // Verificar que no se ha reportado antes
        const reporteExistente = await Reporte.findOne({
          where: {
            tipo: 'usuario',
            elemento_id: usuario_id,
            usuario_id: req.user.id
          },
          transaction: t
        });

        if (reporteExistente) {
          return res.status(400).json({ error: 'Ya has reportado a este usuario' });
        }

        // Crear el reporte
        const reporte = await Reporte.create({
          tipo: 'usuario',
          elemento_id: usuario_id,
          usuario_id: req.user.id,
          motivo,
          descripcion,
          fecha: new Date(),
          estado: 'pendiente'
        }, { transaction: t });

        await t.commit();
        res.status(201).json(reporte);
      } catch (error) {
        await t.rollback();
        console.error('Error al reportar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    },

    listarReportes: async (req, res) => {
      try {
        const { tipo, estado, limit = 20, offset = 0 } = req.query;

        const where = {};
        if (tipo) where.tipo = tipo;
        if (estado) where.estado = estado;

        const reportes = await Reporte.findAndCountAll({
          where,
          include: [{
            model: Usuario,
            as: 'reportador',
            attributes: ['id', 'nombre', 'correo']
          }],
          order: [['fecha', 'DESC']],
          limit: parseInt(limit),
          offset: parseInt(offset)
        });

        res.json({
          total: reportes.count,
          reportes: reportes.rows
        });
      } catch (error) {
        console.error('Error al listar reportes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
      }
    }
  };
  