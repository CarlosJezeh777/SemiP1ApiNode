const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
// Configuración de Cors
const cors = require('cors');
var corsOptions = {origin:true, optionSuccessStatus: 200};
app.use(cors(corsOptions))

// Middleware
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({limit:"100mb",extend:true}));


// Routes
app.use('/', authRoutes);
app.use('/', bookRoutes);
app.use('/', userRoutes);


module.exports = app;
/* // Start the server
const startServer = async () => {
    const port = process.env.PORT || 3000;
    await initializeDatabase();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer(); */