const Usuario = require('./Usuario');
const Anuncio = require('./Anuncio');


// Relación: Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

// Relación: Un usuario puede tener muchos anuncios en favoritos.
Usuario.belongsToMany(Anuncio, {
  through: 'Favorito',
  foreignKey: 'usuario_id',
  otherKey: 'anuncio_id'
});

Anuncio.belongsToMany(Usuario, {
    through: 'Favorito',
    foreignKey: 'anuncio_id',
    otherKey: 'usuario_id'
});