import MechanismController from "../controllers/mechanism.controller";
import { auth } from "../middleware/auth"; 
import { Router } from "express";

const router: Router = Router();

router.post("/borrow/:id", auth, MechanismController.borrowBook);
router.post("/return/:id", auth, MechanismController.returnBook);

export default router;