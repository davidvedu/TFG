const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.ENUM('comprador', 'vendedor', 'admin'),
    allowNull: true,
    defaultValue: 'comprador'
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Usuario',
  timestamps: true,
  createdAt: 'fecha_registro',
  updatedAt: 'fecha_actualizacion'
});

// Método para validar contraseña
Usuario.prototype.validarPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Hook para encriptar contraseña antes de guardar
Usuario.beforeCreate(async (usuario) => {
  if (usuario.password) {
    usuario.password = await bcrypt.hash(usuario.password, 10);
  }
});

Usuario.beforeUpdate(async (usuario) => {
  if (usuario.changed('password')) {
    usuario.password = await bcrypt.hash(usuario.password, 10);
  }
});

module.exports = Usuario;
