const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = require('./Usuario');

const Mensaje = sequelize.define('Mensaje', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  emisor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  receptor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'Mensaje',
  timestamps: true
});

Mensaje.belongsTo(Usuario, { foreignKey: 'emisor_id', as: 'emisor' });
Mensaje.belongsTo(Usuario, { foreignKey: 'receptor_id', as: 'receptor' });

module.exports = Mensaje;
