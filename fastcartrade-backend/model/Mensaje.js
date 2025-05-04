const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Anuncio = require('./Anuncio');

const Mensaje = sequelize.define('Mensaje', {
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    fecha_envio: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('leído', 'no_leído'),
        defaultValue: 'no_leído',
        allowNull: false
    },
    emisor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',  // corregido de "Usuarios" a "Usuario"
            key: 'id'
        }
    },
    receptor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',  // corregido de "Usuarios" a "Usuario"
            key: 'id'
        }
    },
    anuncio_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Anuncio',
            key: 'id'
        }
    }
}, {
    tableName: 'Mensajes',
    timestamps: true,
    createdAt: 'fecha_envio',
    updatedAt: false
});

Mensaje.belongsTo(Usuario, {
    foreignKey: 'emisor_id',
    as: 'emisor'
});

Mensaje.belongsTo(Usuario, {
    foreignKey: 'receptor_id',
    as: 'receptor'
});

Mensaje.belongsTo(Anuncio, {
    foreignKey: 'anuncio_id',
    as: 'anuncio'
});

module.exports = Mensaje;
