// models/Favorito.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Favorito = sequelize.define('Favorito', {

}, {
    tableName: 'Favorito',
    timestamps: false,
});

module.exports = Favorito;

