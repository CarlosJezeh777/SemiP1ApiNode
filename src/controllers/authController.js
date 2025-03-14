const authService = require('../services/authService');

exports.register = async (req, res) => {
    const { nombres,apellidos,foto_perfil, email, contraseña, fecha_nacimiento } = req.body;

    try {
        const user = await authService.register({ nombres,apellidos,foto_perfil, email, contraseña, fecha_nacimiento });
        res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "No se pudo registrar el usuario" });
    }
};

exports.login = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const  user = await authService.login(correo, contraseña);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ error: "Credenciales inválidas" });
    }
};