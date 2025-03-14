const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const dbConfig = require('./config/dbConfig');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

dbConfig(); // Initialize database connection

app.use('/', userRoutes);
app.use('/', bookRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Ebook Vault API' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});