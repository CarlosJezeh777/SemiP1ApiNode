const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/libros', bookController.getAllBooksByUserId);
router.post('/cargar-libro', bookController.createBook);
router.put('/actualizar-libro', bookController.updateBook);
router.delete('/eliminar-libro', bookController.deleteBook);

module.exports = router;