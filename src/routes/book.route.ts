import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { auth } from '../middleware/auth';

const router = Router();
const bookController = new BookController();

router.post('/',auth, bookController.addBook);
router.get('/',auth, bookController.getAllBooks);
router.get('/:id', auth, bookController.getBookById);
router.patch('/:id', auth, bookController.modifyBook);
router.delete('/:id', auth, bookController.removeBook);

export default router;