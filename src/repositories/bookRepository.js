/* const db = require('../config/dbConfig'); */

// Obtener todos los libros
/* const getAllBooks = async () => {
    const [rows] = await db.query('SELECT * FROM libros');
    return rows;
};

// Obtener un libro por ID
const getBookById = async (id) => {
    const [rows] = await db.query('SELECT * FROM libros WHERE id = ?', [id]);
    return rows[0];
};

// Crear un nuevo libro
const createBook = async (bookData) => {
    const { nombre, imagen_portada, sinopsis, autor, año_publicacion, archivo_pdf } = bookData;
    const result = await db.query('INSERT INTO libros (titulo, autor, portada_url, sinopsis, año_publicacion, pdf_url) VALUES (?, ?, ?, ?, ?, ?)', 
    [nombre, autor, imagen_portada, sinopsis, año_publicacion, archivo_pdf]);
    return result.insertId;
};

// Actualizar un libro existente
const updateBook = async (id, bookData) => {
    const { nombre, imagen_portada, sinopsis, autor, año_publicacion, archivo_pdf } = bookData;
    await db.query('UPDATE libros SET titulo = ?, autor = ?, portada_url = ?, sinopsis = ?, año_publicacion = ?, pdf_url = ? WHERE id = ?', 
    [nombre, autor, imagen_portada, sinopsis, año_publicacion, archivo_pdf, id]);
};

// Eliminar un libro
const deleteBook = async (id) => {
    await db.query('DELETE FROM libros WHERE id = ?', [id]);
}; */

const initializeDatabase = require('../config/dbConfig');

/* const getAllBooksByUserId = async (userId) => {
    const db = await initializeDatabase();
    const query = 'SELECT * FROM libros WHERE administrador_id = ?';
    const [rows] = await db.execute(query, [userId]);
    return rows;
}; */
const getAllBooksByUserId = async (userId) => {
    const db = await initializeDatabase();
    const query = `
        SELECT 
            l.id AS ID, 
            l.titulo AS nombre, 
            l.portada_url AS foto, 
            l.sinopsis AS descripcion, 
            c.nombre AS categoria,
            true AS asignado
        FROM libros l
        LEFT JOIN adquisiciones a ON l.id = a.libro_id AND a.usuario_id = ?
        LEFT JOIN libro_categoria lc ON l.id = lc.libro_id
        LEFT JOIN categorias c ON lc.categoria_id = c.id

    `;
    const [rows] = await db.execute(query, [userId, userId]);
    return rows;
};


const createBook = async (bookData) => {
    const db = await initializeDatabase();
    const { titulo, autor, portada_url, sinopsis, año_publicacion, pdf_url } = bookData;
    const query = 'INSERT INTO libros (titulo, autor, portada_url, sinopsis, año_publicacion, pdf_url) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [titulo, autor, portada_url, sinopsis, año_publicacion, pdf_url];
    const [result] = await db.execute(query, values);
    return result.insertId;
};
const assignCategory = async (libro_id, categoria_id) => {
    const db = await initializeDatabase();
    const query = 'INSERT INTO libro_categoria (libro_id, categoria_id) VALUES (?, ?)';
    await db.execute(query, [libro_id, categoria_id]);
};

const updateBook = async (bookData) => {
    const db = await initializeDatabase();
    const { id, titulo, autor, portada_url, sinopsis, año_publicacion, pdf_url } = bookData;
    let query = 'UPDATE libros SET titulo = ?, autor = ?, sinopsis = ?, año_publicacion = ?';
    const values = [titulo, autor, sinopsis, año_publicacion];

    if (portada_url) {
        query += ', portada_url = ?';
        values.push(portada_url);
    }

    if (pdf_url) {
        query += ', pdf_url = ?';
        values.push(pdf_url);
    }

    query += ' WHERE id = ?';
    values.push(id);

    const [result] = await db.execute(query, values);
    return result.affectedRows;
};

const deleteBook = async (bookId) => {
    const db = await initializeDatabase();
    const query = 'SELECT * FROM libros WHERE id = ?';
    const [rows] = await db.execute(query, [bookId]);
    const libro = rows[0];

    if (!libro) {
        throw new Error('Libro no encontrado');
    }

    const deleteQuery = 'DELETE FROM libros WHERE id = ?';
    const [result] = await db.execute(deleteQuery, [bookId]);
    return result.affectedRows;
};

module.exports = {
   /*  getAllBooks,
    getBookById, */
    createBook,
    updateBook,
    deleteBook,
    getAllBooksByUserId,
    assignCategory
};