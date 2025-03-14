const bookService = require('../services/bookService');

exports.getAllBooksByUserId = async (req, res) => {
    const { id_usuario } = req.body;

    try {
        const books = await bookService.getAllBooksByUserId(id_usuario);
        res.status(200).json({ libros: books });
    } catch (error) {
        console.error('Error al obtener libros:', error);
        res.status(401).json({ error: "Usuario no autorizado" });
    }
};

exports.createBook = async (req, res) => {
    const { nombre, imagen_portada, sinopsis, autor, año_publicacion, archivo_pdf} = req.body;


    if (!nombre || !imagen_portada || !sinopsis || !autor || !año_publicacion || !archivo_pdf) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        await bookService.createBook({ titulo: nombre, autor, portada_url: imagen_portada, sinopsis, año_publicacion, pdf_url: archivo_pdf});
        res.status(200).json({ mensaje: "Libro creado correctamente" });
    } catch (error) {
        console.error('Error al crear libro:', error);
        res.status(401).json({ error: "No se pudo crear el libro" });
    }
};

exports.updateBook = async (req, res) => {
    const {id, nombre, imagen_portada, sinopsis, autor, año_publicacion, archivo_pdf } = req.body;

    try {
        await bookService.updateBook({ id, titulo: nombre, autor, portada_url: imagen_portada, sinopsis, año_publicacion, pdf_url: archivo_pdf });
        res.status(200).json({ mensaje: "Libro actualizado correctamente" });
    } catch (error) {
        console.error('Error al actualizar libro:', error);
        res.status(401).json({ error: "No se pudo actualizar el libro" });
    }
};

exports.deleteBook = async (req, res) => {
    const { id_libro } = req.body;

    try {
        await bookService.deleteBook(id_libro);
        res.status(200).json({ mensaje: "Libro eliminado correctamente" });
    } catch (error) {
        console.error('Error al eliminar libro:', error);
        res.status(401).json({ error: "No se pudo eliminar el libro" });
    }
};