const mysql = require('mysql2/promise');

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

module.exports = initializeDatabase;