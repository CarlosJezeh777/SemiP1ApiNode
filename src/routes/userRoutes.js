const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// Rutas para el registro de usuario
router.post('/registrar', UserController.registrarUsuario);

// Rutas para el inicio de sesión de usuario
router.post('/login', UserController.loginUsuario);

// Rutas para la actualización del perfil de usuario
router.post('/update_profile', UserController.updateProfile);

module.exports = router;