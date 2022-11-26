import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import * as authContoller from "../controllers/authController";

const router = new (Router as any)();

router.get('/sign-in',);
router.get('/sign-up', authContoller.signUp);
router.get('/logout', validateToken);

export default router;