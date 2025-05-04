// controllers/mensajesController.js
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const Mensaje = require('../model/Mensaje');
const Anuncio = require('../model/Anuncio');
const Usuario = require('../model/Usuario');

module.exports = {
  // Enviar un mensaje
  enviarMensaje: async (req, res) => {
    try {
      const { contenido, receptor_id, anuncio_id } = req.body;
      const emisor_id = req.user.id;

      // Validaciones básicas
      if (!contenido || !receptor_id || !anuncio_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      if (contenido.length > 1000) {
        return res.status(400).json({ error: 'El mensaje no puede exceder los 1000 caracteres' });
      }

      if (contenido.trim().length === 0) {
        return res.status(400).json({ error: 'El mensaje no puede estar vacío' });
      }

      // Verificar que el anuncio existe y está activo
      const anuncio = await Anuncio.findByPk(anuncio_id, );
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      if (anuncio.estado !== 'activo') {
        return res.status(400).json({ error: 'No se pueden enviar mensajes a anuncios inactivos' });
      }

      // Verificar que el receptor existe y está activo
      const receptor = await Usuario.findByPk(receptor_id, );
      if (!receptor) {
        return res.status(404).json({ error: 'Usuario receptor no encontrado' });
      }

      if (!receptor.activo) {
        return res.status(400).json({ error: 'No se pueden enviar mensajes a usuarios inactivos' });
      }

      // Verificar que no se está enviando un mensaje a sí mismo
      if (emisor_id === receptor_id) {
        return res.status(400).json({ error: 'No puedes enviarte mensajes a ti mismo' });
      }

      // Verificar que el emisor no está bloqueado
      const emisor = await Usuario.findByPk(emisor_id, );
      if (emisor.bloqueado) {
        return res.status(403).json({ error: 'Tu cuenta está bloqueada' });
      }

      const mensaje = await Mensaje.create({
        contenido: contenido.trim(),
        emisor_id,
        receptor_id,
        anuncio_id,
        fecha_envio: new Date(),
        leido: false
      }, );

      await t.commit();
      res.status(201).json({
        mensaje: 'Mensaje enviado exitosamente',
        data: mensaje
      });
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Obtener mensajes para un usuario
  getMensajes: async (req, res) => {
    try {
      const { limit = 20, offset = 0 } = req.query;
      const usuarioId = req.user.id;

      // Validar parámetros de paginación
      const parsedLimit = parseInt(limit);
      const parsedOffset = parseInt(offset);

      if (isNaN(parsedLimit) || isNaN(parsedOffset) || parsedLimit < 1 || parsedOffset < 0) {
        return res.status(400).json({ error: 'Parámetros de paginación inválidos' });
      }

      const mensajes = await Mensaje.findAndCountAll({
        where: {
          [Op.or]: [
            { emisor_id: usuarioId },
            { receptor_id: usuarioId }
          ]
        },
        include: [{
          model: Usuario,
          as: 'emisor',
          attributes: ['id', 'nombre', 'foto']
        }, {
          model: Usuario,
          as: 'receptor',
          attributes: ['id', 'nombre', 'foto']
        }, {
          model: Anuncio,
          attributes: ['id', 'titulo', 'estado']
        }],
        order: [['fecha_envio', 'DESC']],
        limit: parsedLimit,
        offset: parsedOffset,
        transaction: t
      });

      res.json({
        total: mensajes.count,
        paginacion: {
          limit: parsedLimit,
          offset: parsedOffset,
          total_paginas: Math.ceil(mensajes.count / parsedLimit)
        },
        mensajes: mensajes.rows
      });
    } catch (error) {
      console.error('Error al obtener mensajes:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Obtener una conversación entre dos usuarios (o basada en un anuncio)
  getConversacion: async (req, res) => {
    try {
      const { id } = req.params;
      const { limit = 50, offset = 0 } = req.query;
      const usuarioId = req.user.id;

      // Validar parámetros de paginación
      const parsedLimit = parseInt(limit);
      const parsedOffset = parseInt(offset);

      if (isNaN(parsedLimit) || isNaN(parsedOffset) || parsedLimit < 1 || parsedOffset < 0) {
        return res.status(400).json({ error: 'Parámetros de paginación inválidos' });
      }

      // Verificar que el anuncio existe
      const anuncio = await Anuncio.findByPk(id, );
      if (!anuncio) {
        return res.status(404).json({ error: 'Anuncio no encontrado' });
      }

      const mensajes = await Mensaje.findAndCountAll({
        where: {
          anuncio_id: id,
          [Op.or]: [
            { emisor_id: usuarioId },
            { receptor_id: usuarioId }
          ]
        },
        include: [{
          model: Usuario,
          as: 'emisor',
          attributes: ['id', 'nombre', 'foto']
        }, {
          model: Usuario,
          as: 'receptor',
          attributes: ['id', 'nombre', 'foto']
        }],
        order: [['fecha_envio', 'ASC']],
        limit: parsedLimit,
        offset: parsedOffset,
        transaction: t
      });

      // Marcar mensajes como leídos
      await Mensaje.update(
        { leido: true },
        {
          where: {
            anuncio_id: id,
            receptor_id: usuarioId,
            leido: false
          },
          transaction: t
        }
      );

      res.json({
        total: mensajes.count,
        paginacion: {
          limit: parsedLimit,
          offset: parsedOffset,
          total_paginas: Math.ceil(mensajes.count / parsedLimit)
        },
        mensajes: mensajes.rows
      });
    } catch (error) {
      console.error('Error al obtener conversación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  // Marcar un mensaje como leído
  marcarComoLeido: async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioId = req.user.id;

      const mensaje = await Mensaje.findByPk(id, );
      if (!mensaje) {
        return res.status(404).json({ error: 'Mensaje no encontrado' });
      }

      // Verificar que el usuario es el receptor
      if (mensaje.receptor_id !== usuarioId) {
        return res.status(403).json({ error: 'No tienes permiso para marcar este mensaje como leído' });
      }

      // Verificar que el mensaje no está ya leído
      if (mensaje.leido) {
        return res.status(400).json({ error: 'El mensaje ya está marcado como leído' });
      }

      await mensaje.update({ leido: true }, );
      
      res.json({ 
        mensaje: 'Mensaje marcado como leído exitosamente',
        data: mensaje
      });
    } catch (error) {
      console.error('Error al marcar mensaje como leído:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};
