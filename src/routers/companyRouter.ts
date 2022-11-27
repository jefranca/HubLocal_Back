import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import * as companyContoller from "../controllers/companyController";

const router = new (Router as any)();

router.use(validateToken);
router.get('',companyContoller.getCompany);
router.get('/local-responsible',companyContoller.getOneCompanyWithRelations);
router.post('', companyContoller.postCompany);
router.put('',);
router.delete('',);

export default router;