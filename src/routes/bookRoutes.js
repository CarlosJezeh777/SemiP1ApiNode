import express from 'express';
import BookController from '../controllers/bookController.js';

const router = express.Router();
const bookController = new BookController();


router.post('/cargar-libro', bookController.loadBook);
router.post('/actualizar-libro', bookController.updateBook);
router.post('/eliminar-libro', bookController.deleteBook);
router.post('/libros', bookController.getBooks);
router.post('/adquisicion', bookController.acquireBook);

export default router;