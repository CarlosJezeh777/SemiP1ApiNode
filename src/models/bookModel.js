const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

// Definición del modelo de datos para los libros
const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    portada_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sinopsis: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    año_publicacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pdf_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'libros',
    timestamps: true,
});

// Exportar el modelo
module.exports = Book;