
import * as companyService from "../services/companyService"

async function getCompany(req: Request, res: Response, next: NextFunction) {
  try {
    const companies = await companyService.getAllCompanies()
    
    res.send(companies);
  } catch (error: any) {
    next(error);
  }
}

export {getCompany}