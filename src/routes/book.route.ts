import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { auth } from '../middleware/auth';

const router = Router();
const bookController = new BookController();

router.post('/',auth, bookController.addBook);
router.get('/',auth, bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.patch('/:id', bookController.modifyBook);
router.delete('/:id', bookController.removeBook);

export default router;