const mysql = require('mysql');
const dbConfig = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connection = dbConfig();

const UserController = {
    loginUser: (req, res) => {
        const { correo, contraseña } = req.body;
        const query = "SELECT * FROM usuarios WHERE email = ?";
        
        connection.query(query, [correo], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            }
            if (results.length > 0) {
                const user = results[0];
                const passwordIsValid = bcrypt.compareSync(contraseña, user.user_password);
                if (passwordIsValid) {
                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    return res.status(200).json({
                        id_usuario: user.id,
                        nombre: user.nombres,
                        apellido: user.apellidos,
                        correo: user.email,
                        foto_perfil: user.foto_perfil,
                        fecha_nacimiento: user.fecha_nacimiento,
                        token: token
                    });
                }
            }
            return res.status(401).json({ error: 'Credenciales inválidas' });
        });
    },

    registrarUsuario: (req, res) => {
        const { nombres, apellidos, email, contraseña, fecha_nacimiento, foto_perfil } = req.body;
        const hashedPassword = bcrypt.hashSync(contraseña, 8);
        const query = "INSERT INTO usuarios (nombres, apellidos, foto_perfil, email, user_password, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)";
        
        connection.query(query, [nombres, apellidos, foto_perfil, email, hashedPassword, fecha_nacimiento], (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'No se pudo registrar el usuario' });
            }
            return res.status(200).json({ mensaje: 'Usuario registrado exitosamente' });
        });
    },

    updateProfile: (req, res) => {
        const { ID, nombres, apellidos, email, contraseña, fecha_nacimiento, foto_perfil } = req.body;
        const query = "UPDATE usuarios SET nombres = ?, apellidos = ?, email = ?, user_password = ?, fecha_nacimiento = ? WHERE id = ?";
        const values = [nombres, apellidos, email, contraseña, fecha_nacimiento, ID];

        connection.query(query, values, (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'No se pudo actualizar el usuario' });
            }
            return res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
        });
    }
};

module.exports = UserController;