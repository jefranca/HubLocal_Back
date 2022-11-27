
import { Request, Response, NextFunction } from "express";
import ValidationError from "../errors/ValidationError";
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
    if(!companyId) throw new ValidationError("Need a company Id to continue")
    const company = await companyService.getOneCompanyWithRelations(companyId)
    if(!company.length) throw new ValidationError("Company does not exist")
    res.send(company);
    
  } catch (error: any) {
    if (error.name === "ValidationError") return res.status(400).send(error.message)
    next(error);
  }
}

async function postCompany(req: Request, res: Response, next: NextFunction) {
  const {name,cnpj,description,local,responsible} = req.body;
  const {userId} = res.locals

  try {
    await companyService.postCompany(name,cnpj,description,local,responsible,userId)
    res.sendStatus(201)
  } catch (error) {
    next(error);
  }
}

export {getCompany, getOneCompanyWithRelations, postCompany}