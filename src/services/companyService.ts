import pkg from "@prisma/client";


const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function getAllCompanies() {
  const companies = await prisma.company.findMany()
  return companies
}


export {getAllCompanies}