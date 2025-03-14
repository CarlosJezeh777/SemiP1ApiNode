const initializeDatabase = require('../config/dbConfig');

/* // Función para crear un nuevo usuario
const createUser = async (userData) => {
    const [result] = await db.query('INSERT INTO usuarios SET ?', userData);
    return result.insertId;
};
 */
// Función para obtener un usuario por su ID
/* const getUserById = async (userId) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [userId]);
    return rows[0];
};

// Función para obtener un usuario por su correo electrónico
const getUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
};

// Función para actualizar un usuario
const updateUser = async (userId, userData) => {
    await db.query('UPDATE usuarios SET ? WHERE id = ?', [userData, userId]);
};

// Función para eliminar un usuario
const deleteUser = async (userId) => {
    await db.query('DELETE FROM usuarios WHERE id = ?', [userId]);
}; */


/* const findByEmail = async (correo) => {

    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [correo]);
    console.log(rows[0]);
    return rows[0];
}; */

const findByEmail = async (correo_electronico) => {
    try {
        const db = await initializeDatabase();
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const [rows] = await db.execute(query, [correo_electronico]);
        return rows[0];
    } catch (error) {
        console.error('Error al buscar usuario por correo electrónico:', error);
        throw error;
    }
};

const createUser = async (userData) => {
    try {
        const db = await initializeDatabase();
        const { nombres,apellidos, correo_electronico, contraseña, fecha_nacimiento  } = userData;
        const query = 'INSERT INTO usuarios (nombres,apellidos, email, contraseña, fecha_nacimiento) VALUES (?,?, ?, ?, ?)';
        const values = [nombres,apellidos, correo_electronico, contraseña, fecha_nacimiento];
        const [result] = await db.execute(query, values);
        return result.insertId;
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
};
const updateUser = async (user) => {
    const db = await initializeDatabase();
    const { id, nombres, apellidos, email, user_password, foto_perfil } = user;
    let query = `
        UPDATE usuarios 
        SET 
            nombres = ?, 
            apellidos = ?, 
            email = ?, 
            user_password = ?
    `;
    const values = [nombres, apellidos, email, user_password];

    if (foto_perfil) {
        query += ", foto_perfil = ?";
        values.push(foto_perfil);
    }

    query += " WHERE id = ?";
    values.push(id);

    const [result] = await db.execute(query, values);
    return result.affectedRows;
};


// Exportar las funciones
module.exports = {
    createUser,
    /* getUserById,
    getUserByEmail,
    updateUser,
    deleteUser, */
    findByEmail,
    updateUser
};