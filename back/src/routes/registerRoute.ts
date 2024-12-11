import { Router } from "express";
import { registerSoldier } from "../controllers/registerController";
import { login } from "../controllers/loginController";
import { authMiddleware , isCommanderMiddleware} from "../middlewares/authMiddleware";
const router = Router();

router.post('/register', registerSoldier);
router.post('/login', login);

export default router;