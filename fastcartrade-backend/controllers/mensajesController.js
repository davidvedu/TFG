const Mensaje = require('../model/Mensaje');
const Usuario = require('../model/Usuario');
const Anuncio = require('../model/Anuncio');

module.exports = {
  // Enviar un nuevo mensaje
  enviarMensaje: async (req, res) => {
    try {
      const { receptor_id, anuncio_id, contenido } = req.body;
      const emisor_id = req.usuario.id;

      // Validar datos
      if (!receptor_id || !anuncio_id || !contenido) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      // Verificar que el receptor existe
      const receptorExiste = await Usuario.findByPk(receptor_id);
      if (!receptorExiste) {
        return res.status(404).json({ error: 'El receptor no existe' });
      }

      // Verificar que el anuncio existe
      const anuncioExiste = await Anuncio.findByPk(anuncio_id);
      if (!anuncioExiste) {
        return res.status(404).json({ error: 'El anuncio no existe' });
      }

      // Crear el mensaje
      const nuevoMensaje = await Mensaje.create({
        emisor_id,
        receptor_id,
        anuncio_id,
        contenido,
        fecha_envio: new Date(),
        leido: false
      });

      // Obtener datos completos para la respuesta
      const mensajeConDetalles = await Mensaje.findByPk(nuevoMensaje.id, {
        include: [
          {
            model: Usuario,
            as: 'emisor',
            attributes: ['id', 'nombre', 'foto']
          },
          {
            model: Usuario,
            as: 'receptor',
            attributes: ['id', 'nombre', 'foto']
          },
          {
            model: Anuncio,
            as: 'anuncio',
            attributes: ['id', 'titulo', 'imagen_principal']
          }
        ]
      });

      res.status(201).json({
        mensaje: 'Mensaje enviado correctamente',
        datos: mensajeConDetalles
      });
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
  },

  // Obtener mensajes recibidos
  getMensajesRecibidos: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: usuarioSolicitante } = req.usuario;

      // Verificar permisos
      if (parseInt(id) !== usuarioSolicitante && req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'No tienes permiso para ver estos mensajes' });
      }

      // Obtener mensajes recibidos
      const mensajes = await Mensaje.findAll({
        where: { receptor_id: id },
        include: [
          {
            model: Usuario,
            as: 'emisor',
            attributes: ['id', 'nombre', 'foto']
          },
          {
            model: Usuario,
            as: 'receptor',
            attributes: ['id', 'nombre', 'foto']
          },
          {
            model: Anuncio,
            as: 'anuncio',
            attributes: ['id', 'titulo', 'imagen_principal']
          }
        ],
        order: [['fecha_envio', 'DESC']]
      });

      res.json(mensajes);
    } catch (error) {
      console.error('Error al obtener mensajes recibidos:', error);
      res.status(500).json({ error: 'Error al obtener los mensajes recibidos' });
    }
  },

  // Obtener mensajes enviados
  getMensajesEnviados: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: usuarioSolicitante } = req.usuario;

      // Verificar permisos
      if (parseInt(id) !== usuarioSolicitante && req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'No tienes permiso para ver estos mensajes' });
      }

      // Obtener mensajes enviados
      const mensajes = await Mensaje.findAll({
        where: { emisor_id: id },
        include: [
          {
            model: Usuario,
            as: 'emisor',
            attributes: ['id', 'nombre', 'foto']
          },
          {
            model: Usuario,
            as: 'receptor',
            attributes: ['id', 'nombre', 'foto']
          },
          {
            model: Anuncio,
            as: 'anuncio',
            attributes: ['id', 'titulo', 'imagen_principal']
          }
        ],
        order: [['fecha_envio', 'DESC']]
      });

      res.json(mensajes);
    } catch (error) {
      console.error('Error al obtener mensajes enviados:', error);
      res.status(500).json({ error: 'Error al obtener los mensajes enviados' });
    }
  },

  // Marcar mensaje como leído
  marcarComoLeido: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: usuarioId } = req.usuario;

      // Buscar el mensaje
      const mensaje = await Mensaje.findByPk(id);

      if (!mensaje) {
        return res.status(404).json({ error: 'Mensaje no encontrado' });
      }

      // Verificar que el usuario sea el receptor
      if (mensaje.receptor_id !== usuarioId) {
        return res.status(403).json({ error: 'No tienes permiso para marcar este mensaje como leído' });
      }

      // Actualizar estado
      mensaje.leido = true;
      await mensaje.save();

      res.json({ mensaje: 'Mensaje marcado como leído' });
    } catch (error) {
      console.error('Error al marcar mensaje como leído:', error);
      res.status(500).json({ error: 'Error al marcar el mensaje como leído' });
    }
  },

  // Eliminar mensaje
  eliminarMensaje: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: usuarioId } = req.usuario;

      // Buscar el mensaje
      const mensaje = await Mensaje.findByPk(id);

      if (!mensaje) {
        return res.status(404).json({ error: 'Mensaje no encontrado' });
      }

      // Verificar que el usuario sea el emisor o receptor
      if (mensaje.emisor_id !== usuarioId && mensaje.receptor_id !== usuarioId) {
        return res.status(403).json({ error: 'No tienes permiso para eliminar este mensaje' });
      }

      // Eliminar mensaje
      await mensaje.destroy();

      res.json({ mensaje: 'Mensaje eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      res.status(500).json({ error: 'Error al eliminar el mensaje' });
    }
  }
};