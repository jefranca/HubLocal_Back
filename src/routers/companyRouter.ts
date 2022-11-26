import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import * as companyContoller from "../controllers/companyController";

const router = new (Router as any)();

router.use(validateToken);
router.get('',companyContoller.getCompany);
router.post('',);
router.put('',);
router.delete('',);

export default router;