import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import * as authContoller from "../controllers/authController";

const router = new (Router as any)();

router.post('/sign-in', authContoller.signIn);
router.post('/sign-up', authContoller.signUp);
router.delete('/logout', validateToken, authContoller.logout);

export default router;