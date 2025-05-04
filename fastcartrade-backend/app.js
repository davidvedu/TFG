const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes/routes');
const sequelize = require('./config/database');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

sequelize.sync({ force: true }) // o { alter: true } si prefieres
  .then(() => console.log("Modelos sincronizados"))
  .catch((err) => console.error("Error al sincronizar modelos", err));


sequelize.authenticate()
  .then(() => console.log('Conexión con la base de datos establecida correctamente.'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));
