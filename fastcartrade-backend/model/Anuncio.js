const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Anuncio = sequelize.define('Anuncio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    matricula: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Vehiculo',
            key: 'matricula'
        }
    },
    vendedor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'id'
        }
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: true,
            min: 0
        }
    },
    estado: {
        type: DataTypes.ENUM('activo', 'inactivo', 'vendido'),
        defaultValue: 'activo',
        allowNull: false
    }
}, {
    tableName: 'Anuncio',
    timestamps: true,
    createdAt: 'fecha_publicacion',
    updatedAt: 'fecha_actualizacion'
});



module.exports = Anuncio;
