import pkg from "@prisma/client";
import HaveNoCompanies from "../errors/HaveNoCompanies";


const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function getMyCompanies(userId: number) {
  const companies = await prisma.company.findMany({
    where:{
      userId
    }
  })
  if(!companies.length) throw new HaveNoCompanies("You don't have any company registered")
  return companies
}

async function  getOneCompanyWithRelations(companyId:number){
  const company = await prisma.company.findMany({
    where:{
      id:companyId
    },
    include:{
      local: true,
      responsible: true,
    }
  })
  return company
}


export {getMyCompanies, getOneCompanyWithRelations}