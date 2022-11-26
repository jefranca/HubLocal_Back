import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import * as authContoller from "../controllers/authController";

const router = new (Router as any)();

router.get('/sign-in', authContoller.signIn);
router.get('/sign-up', authContoller.signUp);
router.get('/logout', validateToken);

export default router;