const express = require("express");
const router = express.Router();

// ============================
// CONTROLADORES
// ============================
const sesionController = require("../controllers/sesionController");
const perfilController = require("../controllers/perfilController");
const favoritosController = require("../controllers/favoritosController");
const anunciosController = require("../controllers/anunciosController");
const vehiculoController = require("../controllers/vehiculoController");
const adminController = require("../controllers/adminController");
const reportesController = require("../controllers/reportesController");
const comentariosController = require("../controllers/comentariosController");
const mensajesController = require("../controllers/mensajesController");
const usuariosController = require("../controllers/usuariosController");

// ============================
// RUTAS DE SESIÓN
// ============================
router.get("/", sesionController.inicio); 
router.post("/api/sesion/registro", sesionController.registro);
router.post("/api/sesion/login", sesionController.login);
router.post("/api/sesion/logout", sesionController.validarToken, sesionController.logout);
router.post("/api/sesion/recuperar", sesionController.recuperarPassword);
router.post("/api/sesion/reset-password", sesionController.validarToken, sesionController.resetPassword);
router.delete("/api/sesion/cuenta", sesionController.validarToken, sesionController.borraCuenta);

// ============================
// RUTAS DE PERFIL
// ============================
router.get("/api/perfil", perfilController.verPerfil);
router.put("/api/perfil/foto", perfilController.cambiarFoto);
router.put("/api/perfil/rol", perfilController.cambiarRol);
router.put("/api/perfil", perfilController.actualizarPerfil);

// ============================
// RUTAS DE FAVORITOS
// ============================
router.post("/api/favoritos/:id", favoritosController.agregarFavorito);
router.delete("/api/favoritos/:id", favoritosController.eliminarFavorito);
router.get("/api/favoritos", favoritosController.listarFavoritos);

// ============================
// RUTAS DE ANUNCIOS
// ============================
router.get("/api/anuncios", anunciosController.verMisAnuncios);
router.get("/api/anuncios/:id", anunciosController.detalleAnuncio);
router.post("/api/anuncios", anunciosController.crearAnuncio);
router.put("/api/anuncios/:id", anunciosController.setAnuncio);
router.delete("/api/anuncios/:id", anunciosController.borraAnuncio);
router.post("/api/anuncios/:id/reservar", anunciosController.setAnuncioReservado);
router.post("/api/anuncios/:id/vender", anunciosController.setAnuncioVendido);

// ============================
// RUTAS DE VEHICULOS
// ============================
router.get("/api/vehiculos", vehiculoController.listarVehiculos);
router.get("/api/vehiculos/:id", vehiculoController.detalleVehiculo);
router.get("/api/marcas", vehiculoController.listarMarcas);
router.get("/api/modelos", vehiculoController.listarModelos);

// ============================
// RUTAS DE ADMINISTRADORES
// ============================
router.get("/api/admin/usuarios", adminController.listarUsuariosReportados);
router.put("/api/admin/usuarios/:id/bloquear", adminController.bloquearUsuario);
router.delete("/api/admin/usuarios/:id", adminController.eliminarUsuario);
router.get("/api/admin/anuncios", adminController.listarAnunciosReportados);
router.delete("/api/admin/anuncios/:id", adminController.eliminarAnuncio);
router.get("/api/admin/comentarios", adminController.listarComentariosReportados);
router.delete("/api/admin/comentarios/:id", adminController.eliminarComentario);
router.post("/api/admin/anuncios/:id/aprobar", adminController.aprobarAnuncio);
router.post("/api/admin/anuncios/:id/rechazar", adminController.rechazarAnuncio);

// ============================
// RUTAS DE MENSAJES
// ============================
router.post("/api/mensajes", mensajesController.enviarMensaje);
router.get("/api/mensajes/:idUsuario", mensajesController.getMensajes);
router.get("/api/mensajes/conversacion/:idConversacion", mensajesController.getConversacion);
router.put("/api/mensajes/:id/leido", mensajesController.marcarComoLeido);

// ============================
// RUTAS DE REPORTES
// ============================
router.post("/api/reportes/anuncio", reportesController.reportarAnuncio);
router.post("/api/reportes/usuario", reportesController.reportarUsuario);
router.get("/api/reportes", reportesController.listarReportes);

// ============================
// RUTAS DE COMENTARIOS Y VALORACIONES
// ============================
router.post("/api/comentarios/:idAnuncio", comentariosController.dejarComentario);
router.get("/api/comentarios/:idUsuario", comentariosController.getComentarios);

// ============================
// RUTAS DE USUARIOS
// ============================
router.get("/api/usuarios", usuariosController.getUsuarios);
router.get("/api/usuarios/:id", usuariosController.getUsuario);
router.put("/api/usuarios/:id", usuariosController.setUsuario);
router.delete("/api/usuarios/:id", usuariosController.borraUsuario);

module.exports = router;
