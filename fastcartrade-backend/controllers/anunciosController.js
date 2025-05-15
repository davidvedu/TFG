const { Op } = require('sequelize');
const Anuncio = require('../model/Anuncio');
const Vehiculo = require('../model/Vehiculo');
const Marca = require('../model/Marca');
const Modelo = require('../model/Modelo');

module.exports = {
  verAnuncios: async (req, res) => {
    try {
      const anuncios = await Anuncio.findAll();
      res.json(anuncios);
    } catch (error) {
      console.error('Error al obtener anuncios:', error);
      res.status(500).json({ mensaje: 'Error al obtener los anuncios' });
    }
  },
  
  verAnunciosFiltrados: async (req, res) => {
    try {
      console.log('🟡 Query recibida:', req.query);
  
      const whereAnuncio = {
        estado: 'activo'
      };
  
      const whereVehiculo = {};
      const whereModelo = {};
      const whereMarca = {};
  
      if (req.query.marca_id) {
        whereMarca.id = req.query.marca_id;
      }
  
      if (req.query.modelo_id) {
        whereModelo.id = req.query.modelo_id;
      }
      
      if (req.query.precio_min || req.query.precio_max) {
        whereAnuncio.precio = {};
        if (req.query.precio_min) {
          whereAnuncio.precio[Op.gte] = req.query.precio_min;
        }
        if (req.query.precio_max) {
          whereAnuncio.precio[Op.lte] = req.query.precio_max;
        }
      }
  
      if (req.query.anio_min || req.query.anio_max) {
        whereVehiculo.anio = {};
        if (req.query.anio_min) {
          whereVehiculo.anio[Op.gte] = req.query.anio_min;
        }
        if (req.query.anio_max) {
          whereVehiculo.anio[Op.lte] = req.query.anio_max;
        }
      }
  
      if (req.query.combustible) {
        whereVehiculo.combustible = req.query.combustible;
      }
  
      if (req.query.km_min || req.query.km_max) {
        whereVehiculo.kilometros = {};
        if (req.query.km_min) {
          whereVehiculo.kilometros[Op.gte] = req.query.km_min;
        }
        if (req.query.km_max) {
          whereVehiculo.kilometros[Op.lte] = req.query.km_max;
        }
      }
  
      // Mostrar condiciones antes de ejecutar la consulta
      console.log('📘 whereAnuncio:', whereAnuncio);
      console.log('📗 whereVehiculo:', whereVehiculo);
      console.log('📙 whereModelo:', whereModelo);
      console.log('📕 whereMarca:', whereMarca);
  
      const anuncios = await Anuncio.findAll({
        where: whereAnuncio,
        include: [
          {
            model: Vehiculo,
            as: 'vehiculo',
            required: true,
            where: Object.keys(whereVehiculo).length ? whereVehiculo : undefined,
            include: [
              {
                model: Modelo,
                required: true,
                where: Object.keys(whereModelo).length ? whereModelo : undefined,
                include: [
                  {
                    model: Marca,
                    required: true,
                    where: Object.keys(whereMarca).length ? whereMarca : undefined
                  }
                ]
              }
            ]
          }
        ],
        order: [['fecha_publicacion', 'DESC']]
      });
  
      console.log(`✅ Anuncios encontrados: ${anuncios.length}`);
      res.json(anuncios);
    } catch (error) {
      console.error('❌ Error al filtrar anuncios:', error);
      res.status(500).json({ mensaje: 'Error al filtrar los anuncios' });
    }
  },  
  

  verMisAnuncios: async (req, res) => {
    try {
      const anuncios = await Anuncio.findAll({ where: { usuario_id: req.usuarioId } });
      res.json(anuncios);
    } catch (error) {
      console.error('Error al obtener tus anuncios:', error);
      res.status(500).json({ mensaje: 'Error al obtener tus anuncios' });
    }
  },

  detalleAnuncio: async (req, res) => {
    const { id } = req.params;
    try {
      const anuncio = await Anuncio.findByPk(id);
      if (!anuncio) return res.status(404).json({ mensaje: 'Anuncio no encontrado' });
      res.json(anuncio);
    } catch (error) {
      console.error('Error al obtener el detalle del anuncio:', error);
      res.status(500).json({ mensaje: 'Error al obtener el detalle del anuncio' });
    }
  },

  crearAnuncio: async (req, res) => {
    const { titulo, descripcion, precio, categoria } = req.body;
    try {
      const nuevoAnuncio = await Anuncio.create({
        titulo,
        descripcion,
        precio,
        categoria,
        usuario_id: req.usuarioId
      });
      res.status(201).json(nuevoAnuncio);
    } catch (error) {
      console.error('Error al crear el anuncio:', error);
      res.status(500).json({ mensaje: 'Error al crear el anuncio' });
    }
  },

  borraAnuncio: async (req, res) => {
    const { id } = req.params;
    try {
      const eliminado = await Anuncio.destroy({
        where: { id, usuario_id: req.usuarioId }
      });
      if (eliminado) {
        res.json({ mensaje: 'Anuncio eliminado correctamente' });
      } else {
        res.status(404).json({ mensaje: 'Anuncio no encontrado o no autorizado' });
      }
    } catch (error) {
      console.error('Error al borrar el anuncio:', error);
      res.status(500).json({ mensaje: 'Error al borrar el anuncio' });
    }
  },

  setAnuncioReservado: async (req, res) => {
    const { id } = req.params;
    try {
      const [actualizado] = await Anuncio.update({ reservado: true }, { where: { id } });
      if (actualizado) {
        const anuncio = await Anuncio.findByPk(id);
        res.json({ mensaje: 'Anuncio marcado como reservado', anuncio });
      } else {
        res.status(404).json({ mensaje: 'Anuncio no encontrado' });
      }
    } catch (error) {
      console.error('Error al marcar el anuncio como reservado:', error);
      res.status(500).json({ mensaje: 'Error al marcar el anuncio como reservado' });
    }
  },

  setAnuncioVendido: async (req, res) => {
    const { id } = req.params;
    try {
      const [actualizado] = await Anuncio.update({ vendido: true }, { where: { id } });
      if (actualizado) {
        const anuncio = await Anuncio.findByPk(id);
        res.json({ mensaje: 'Anuncio marcado como vendido', anuncio });
      } else {
        res.status(404).json({ mensaje: 'Anuncio no encontrado' });
      }
    } catch (error) {
      console.error('Error al marcar el anuncio como vendido:', error);
      res.status(500).json({ mensaje: 'Error al marcar como vendido' });
    }
  },

  subirFotoPrincipal: async (req, res) => {
    if (!req.file) return res.status(400).json({ mensaje: 'No se subió ninguna foto' });
    try {
      const [actualizado] = await Anuncio.update(
        { imagen_principal: req.file.filename },
        { where: { id: req.params.id } }
      );
      if (actualizado) {
        const anuncio = await Anuncio.findByPk(req.params.id);
        res.json({ mensaje: 'Foto principal subida', anuncio });
      } else {
        res.status(404).json({ mensaje: 'Anuncio no encontrado' });
      }
    } catch (error) {
      console.error('Error al subir la foto principal:', error);
      res.status(500).json({ mensaje: 'Error al subir la foto principal' });
    }
  },

  subirFotosAdicionales: async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ mensaje: 'No se subieron fotos adicionales' });
    }
    try {
      const anuncio = await Anuncio.findByPk(req.params.id);
      if (!anuncio) return res.status(404).json({ mensaje: 'Anuncio no encontrado' });

      const nuevasFotos = req.files.map(file => file.filename);
      const fotosActuales = Array.isArray(anuncio.imagenes_adicionales) ? anuncio.imagenes_adicionales : [];

      anuncio.imagenes_adicionales = [...fotosActuales, ...nuevasFotos];
      await anuncio.save();

      res.json({ mensaje: 'Fotos adicionales subidas', anuncio });
    } catch (error) {
      console.error('Error al subir las fotos adicionales:', error);
      res.status(500).json({ mensaje: 'Error al subir las fotos adicionales' });
    }
  },


};
