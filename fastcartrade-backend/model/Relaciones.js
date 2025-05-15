const Usuario = require('./Usuario');
const Anuncio = require('./Anuncio');
const Vehiculo = require('./Vehiculo');
const Favorito = require('./Favorito');
// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });


// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos
Anuncio.hasMany(Favorito, { foreignKey: 'anuncio_id' });
Favorito.belongsTo(Anuncio, { foreignKey: 'anuncio_id' });

// ======================
// Relaciones de Usuario
// ======================

// Un usuario (vendedor) tiene muchos anuncios.
Usuario.hasMany(Anuncio, { foreignKey: 'vendedor_id' });
Anuncio.belongsTo(Usuario, { foreignKey: 'vendedor_id' });

Vehiculo.belongsToMany(Anuncio, {
  through: 'AnuncioVehiculo',
  foreignKey: 'vehiculo_id',
  otherKey: 'anuncio_id',
  timestamps: false
});

Anuncio.belongsToMany(Vehiculo, {
  through: 'AnuncioVehiculo',
  foreignKey: 'anuncio_id',
  otherKey: 'vehiculo_id',
  timestamps: false
});

// ======================
// Relaciones de Favorito
// ======================

// Un usuario tiene muchos favoritos
Usuario.hasMany(Favorito, { foreignKey: 'usuario_id' });
Favorito.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Un anuncio puede estar en muchos favoritos