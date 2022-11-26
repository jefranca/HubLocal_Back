
import { Request, Response, NextFunction } from "express";
import * as companyService from "../services/companyService"

async function getCompany(req: Request, res: Response, next: NextFunction) {
  const {userId} = res.locals

  try {
    const companies = await companyService.getMyCompanies(userId)
    res.send(companies);
    
  } catch (error: any) {
    if (error.name === "HaveNoCompanies") return res.status(404).send(error.message)
    next(error);
  }
}

async function getOneCompanyWithRelations(req: Request, res: Response, next: NextFunction) {
  const {companyId} = req.body

  try {
    const company = await companyService.getOneCompanyWithRelations(companyId)
    res.send(company);
    
  } catch (error: any) {
    next(error);
  }
}

export {getCompany, getOneCompanyWithRelations}