// controllers/vehiculoController.js
const Vehiculo = require('../model/Vehiculo');
const Modelo = require('../model/Modelo');
const Marca = require('../model/Marca');

module.exports = {
  // Listar todos los vehículos
  listarVehiculos: async (req, res) => {
    try {
      const vehiculos = await Vehiculo.findAll({ include: Modelo });
      res.json(vehiculos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Detalle de un vehículo
  detalleVehiculo: async (req, res) => {
    try {
      const vehiculo = await Vehiculo.findOne({ where: { matricula: req.params.id }, include: Modelo });
      if (!vehiculo) return res.status(404).json({ mensaje: "Vehículo no encontrado" });
      res.json(vehiculo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Listar todas las marcas
  listarMarcas: async (req, res) => {
    try {
      const marcas = await Marca.findAll();
      res.json(marcas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Listar todos los modelos
  listarModelos: async (req, res) => {
    try {
      const modelos = await Modelo.findAll({ include: Marca });
      res.json(modelos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
