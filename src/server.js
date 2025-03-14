/* const express = require('express');/*  */ 
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const app = require('./app');
const PORT = process.env.PORT || 3000;

// Configuración de la base de datos
/* const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ebookvault',
    port: 3306,
    connectTimeout: 10000 // Aumenta el tiempo de espera a 10 segundos
}; */
const dbConfig = {
    host: 'semi1-p1-1s2025.cbyasqy4w8y7.us-east-2.rds.amazonaws.com',
    user: 'lastpass',
    password: 'gQVk58bzt66bq9vBh3T',
    database: 'ebookvault',
    port: 3306,
    connectTimeout: 10000
};
const initializeDatabase = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the MySQL database.');
        return connection;
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};


// Start the server
const startServer = async () => {
    await initializeDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
/* app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); */