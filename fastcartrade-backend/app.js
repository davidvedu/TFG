const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes');
const sequelize = require('./config/database');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

// Configurar middleware para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

sequelize.sync({ force: false }) 
  .then(() => console.log("Modelos sincronizados"))
  .catch((err) => console.error("Error al sincronizar modelos", err));


sequelize.authenticate()
  .then(() => console.log('Conexión con la base de datos establecida correctamente.'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));


require('./model/Relaciones'); // <-- Ejecuta las relaciones
