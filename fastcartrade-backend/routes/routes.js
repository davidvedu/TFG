const express = require("express");
const multer = require("multer");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta";


// ============================
// CONTROLADORES
// ============================
const sesionController = require("../controllers/sesionController");
const perfilController = require("../controllers/perfilController");
const favoritosController = require("../controllers/favoritosController.js");
const anunciosController = require("../controllers/anunciosController");
const vehiculoController = require("../controllers/vehiculoController");
const adminController = require("../controllers/adminController");
const reportesController = require("../controllers/reportesController");
const comentariosController = require("../controllers/comentariosController");
const mensajesController = require("../controllers/mensajesController");
const usuarioController = require("../controllers/usuarioController");

// ============================
// MIDDLEWARES
// ============================
const validarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) return res.status(401).json({ error: "Token no proporcionado" });
  
    const token = authHeader.split(" ")[1];
  
    try {
      const datos = jwt.verify(token, JWT_SECRET);
      req.usuario = datos;
      next();
    } catch (err) {
      res.status(401).json({ error: "Token inválido" });
    }
};

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}-${file.fieldname}.${ext}`);
  }
});

const upload = multer({ storage });

// ============================
// RUTAS DE SESIÓN
// ============================
router.get("/", sesionController.inicio); // ✅ Usado para redireccionar al frontend
router.post("/api/sesion/registro", sesionController.registro); // ✅ Usado en registro.component.ts
router.post("/api/sesion/login", sesionController.login); // ✅ Usado en login.component.ts
router.post("/api/sesion/logout", validarToken, sesionController.logout); // ✅ Usado en nav.component.ts

// ============================
// RUTAS DE ANUNCIOS
// ============================
router.get("/api/anuncios", anunciosController.verAnuncios); 
router.get("/api/mis-anuncios", validarToken, anunciosController.verMisAnuncios);
router.get("/api/anuncios/:id", anunciosController.detalleAnuncio);
router.post("/api/anuncios", validarToken, anunciosController.crearAnuncio);
router.delete("/api/anuncios/:id", validarToken, anunciosController.borraAnuncio);
router.post("/api/anuncios/:id/reservar", validarToken, anunciosController.setAnuncioReservado);
router.post("/api/anuncios/:id/vender", validarToken, anunciosController.setAnuncioVendido);
router.post("/api/anuncios/:id/foto-principal", upload.single("imagen_principal"), anunciosController.subirFotoPrincipal);
router.post("/api/anuncios/:id/fotos", upload.array("imagenes_adicionales", 3), anunciosController.subirFotosAdicionales);
router.get("/api/filtros", anunciosController.verAnunciosFiltrados);

// ============================
// RUTAS DE PERFIL
// ============================
router.get("/api/perfil/:id", validarToken, perfilController.obtenerPerfilCompleto);
router.put("/api/perfil/:id", validarToken, perfilController.actualizarContacto);
router.put("/api/perfil/:id/foto", validarToken, perfilController.actualizarFotoPerfil);
router.put("/api/perfil/:id/password", validarToken, perfilController.cambiarPassword); // ✅ Usado en perfil.component.ts
router.put("/api/perfil", validarToken, perfilController.actualizarPerfil);

// ============================
// RUTAS DE VEHICULOS
// ============================
router.get("/api/marcas", vehiculoController.listarMarcas); 
router.get("/api/modelos", vehiculoController.listarModelos); 
router.get("/api/combustibles", vehiculoController.listarCombustibles); 

// ============================
// RUTAS DE USUARIOS
// ============================
router.get("/api/usuarios/:id", validarToken, usuarioController.obtenerPerfil); // ✅ Usado en perfil.component.ts
router.put("/api/usuarios/:id", validarToken, usuarioController.actualizarPerfil); // ✅ Usado en perfil.component.ts
router.put("/api/usuarios/:id/rol", validarToken, usuarioController.cambiarRol);
router.post("/api/usuarios/:id/foto", validarToken, upload.single("imagen"), usuarioController.subirFotoPerfil); // ✅ Usado en perfil.component.ts

// ============================
// RUTAS DE FAVORITOS
// ============================
// Añadir console.log para depuración
router.get("/api/usuarios/:id/favoritos", validarToken, (req, res, next) => {
  console.log('Ruta de favoritos accedida:', req.url);
  console.log('Parámetros:', req.params);
  console.log('Usuario autenticado:', req.usuario ? req.usuario.id : 'No autenticado');
  next();
}, favoritosController.listarFavoritos);

router.post("/api/favoritos/:anuncioId", validarToken, (req, res, next) => {
  console.log('Ruta para agregar favorito accedida');
  console.log('Anuncio ID:', req.params.anuncioId);
  next();
}, favoritosController.agregarFavorito);

router.delete("/api/favoritos/:id", validarToken, (req, res, next) => {
  console.log('Ruta para eliminar favorito accedida');
  console.log('Favorito ID:', req.params.id);
  next();
}, favoritosController.eliminarFavorito);
router.get("/api/favoritos", validarToken, favoritosController.listarFavoritos);


// ============================
// RUTAS DE MENSAJES
// ============================
router.post("/api/mensajes", validarToken, mensajesController.enviarMensaje);
router.get("/api/usuarios/:id/mensajes/recibidos", validarToken, mensajesController.getMensajesRecibidos);
router.get("/api/usuarios/:id/mensajes/enviados", validarToken, mensajesController.getMensajesEnviados);
router.patch("/api/mensajes/:id/leer", validarToken, mensajesController.marcarComoLeido);
router.delete("/api/mensajes/:id", validarToken, mensajesController.eliminarMensaje);

// ============================
// EXPORTAR RUTAS
// ============================
module.exports = router;
