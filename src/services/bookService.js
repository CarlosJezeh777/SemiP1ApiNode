const bookRepository = require('../repositories/bookRepository');
const axios = require('axios');
var AWS = require('aws-sdk');
const crypto = require('crypto');


const aws_keys = require('../awsCredentialls');
const s3 = new AWS.S3(aws_keys.s3);



const getAllBooksByUserId = async (userId) => {
    const books = await bookRepository.getAllBooksByUserId(userId);
    return books;
};

const createBook = async (bookData) => {
    const { nombre, imagen_portada, sinopsis, autor, año_publicacion, archivo_pdf, categorias } = bookData;
    let url_portada = '';
    let url_pdf = '';
    const random_number = crypto.randomInt(0, 9000);
    const generate_Name = nombre.replace(" ", "_") + random_number;

    // Subir imagen de portada a S3
    try {
        const image_data = new  Buffer.from(imagen_portada, 'base64');
        const name_key = `Fotos/${generate_Name}.jpg`;

        const params = {
            Bucket: 'archivos-semi1-a-g19',
            Key: name_key,
            Body: image_data,
            ContentType: 'image/jpeg'
        };

        const putResult = s3.putObject(params).promise();
            console.log('Resultado de la subida:', putResult);
        url_portada = `https://archivos-semi1-a-g19.s3.amazonaws.com/${name_key}`;
        console.log("Se subió correctamente:", url_portada);
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw new Error('No se pudo subir la imagen');
    }

    // Subir PDF a S3
    try {
        const pdf_data = new Buffer.from(archivo_pdf, 'base64');
        const name_key = `Libros/${generate_Name}.pdf`;

        const params = {
            Bucket: 'archivos-semi1-a-g19',
            Key: name_key,
            Body: pdf_data,
            ContentType: 'application/pdf'
        };

        const putResult = s3.putObject(params).promise();
            console.log('Resultado de la subida:', putResult);
        url_pdf = `https://archivos-semi1-a-g19.s3.amazonaws.com/${name_key}`;
        console.log("Se subió correctamente:", url_pdf);
    } catch (error) {
        console.error("Error al subir el PDF:", error);
        throw new Error('No se pudo subir el PDF');
    }

    // Guardar libro en la base de datos
    const book = {
        titulo: nombre,
        autor,
        portada_url: url_portada,
        sinopsis,
        año_publicacion,
        pdf_url: url_pdf,
        categorias
    };

    const libro_id = await bookRepository.createBook(book);

    // Asignar categorías al libro
    if (categorias && categorias.length > 0) {
        for (const categoria_id of categorias) {
            await bookRepository.assignCategory(libro_id, categoria_id);
        }
    }

    return libro_id;
    //return await bookRepository.createBook(bookData);
};

const updateBook = async (bookData) => {
    const { id, titulo, autor, portada_url, sinopsis, año_publicacion, pdf_url } = bookData;

    // Subir imagen de portada a S3
    if (portada_url) {
        try {
            const image_data = new  Buffer.from(portada_url, 'base64');
            const random_number = crypto.randomInt(0, 9000);
            const name_key = `Fotos/${titulo.replace(' ', '_')}_${random_number}.jpg`;

            const params = {
                Bucket: 'archivos-semi1-a-g19',
                Key: name_key,
                Body: image_data,
                ContentType: 'image/jpeg'
            };

            const putResult = s3.putObject(params).promise();
            console.log('Resultado de la subida:', putResult);
            bookData.portada_url = `https://archivos-semi1-a-g19.s3.amazonaws.com/${name_key}`;
            console.log("Se subió correctamente la imagen de portada:", bookData.portada_url);
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw new Error('No se pudo subir la imagen');
        }
    }

    // Subir PDF a S3
    if (pdf_url) {
        try {
            const pdf_data = new  Buffer.from(pdf_url, 'base64');
            const random_number = crypto.randomInt(0, 9000);
            const name_key = `Libros/${titulo.replace(' ', '_')}_${random_number}.pdf`;

            const params = {
                Bucket: 'archivos-semi1-a-g19',
                Key: name_key,
                Body: pdf_data,
                ContentType: 'application/pdf'
            };

            const putResult = s3.putObject(params).promise();
            console.log('Resultado de la subida:', putResult);
            bookData.pdf_url = `https://archivos-semi1-a-g19.s3.amazonaws.com/${name_key}`;
            console.log("Se subió correctamente el PDF:", bookData.pdf_url);
        } catch (error) {
            console.error("Error al subir el PDF:", error);
            throw new Error('No se pudo subir el PDF');
        }
    }

    return await bookRepository.updateBook(bookData);
};

const deleteBook = async (bookId) => {
    return await bookRepository.deleteBook(bookId);
};

module.exports = {
    getAllBooksByUserId,
    createBook,
    updateBook,
    deleteBook
};