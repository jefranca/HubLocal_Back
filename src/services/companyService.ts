import pkg from "@prisma/client";
import HaveNoCompanies from "../errors/HaveNoCompanies";
import { getAdress } from "../utils/api.cep";


const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function getMyCompanies(userId: number) {
  const companies = await prisma.company.findMany({
    where: {
      userId
    }
  })
  if (!companies.length) throw new HaveNoCompanies("You don't have any company registered")
  return companies
}

async function getOneCompanyWithRelations(companyId: number) {
  const company = await prisma.company.findMany({
    where: {
      id: companyId
    },
    include: {
      local: true,
      responsible: true,
    }
  })
  return company
}

async function postCompany(name: any, cnpj: any, description: any, local: any, responsible: any, userId: number) {

  let localAdress: any = {}
  let responsibleAdress: any = {}

  await getAdress(local.cep)
    .then((res) => { localAdress = res.data })
    .catch((err) => console.error(err))

  await getAdress(responsible.cep)
    .then((res) => { responsibleAdress = res.data })
    .catch((err) => console.error(err))

  const newCompany = await prisma.company.create({
    data: {
      name,
      cnpj,
      description,
      userId
    }
  })

  const newLocal = await prisma.local.create({
    data: {
      name: local.name,
      companyId: newCompany.id,
      adress: localAdress.logradouro,
      city: localAdress.localidade,
      state: localAdress.uf,
      cep: local.cep,
    }
  })

  const newResponsible = await prisma.responsible.create({
    data: {
      name: responsible.name,
      phone: responsible.phone,
      companyId: newCompany.id,
      adress: responsibleAdress.logradouro,
      city: responsibleAdress.localidade,
      state: responsibleAdress.uf,
      cep: responsible.cep,
      localId: newLocal.id
    }
  })

  await prisma.local.updateMany({
    where: {
      id: newLocal.id
    },
    data: {
      mainresponsibleId: newResponsible.id
    }
  })

  await prisma.company.updateMany({
    where: {
      id: newCompany.id
    },
    data: {
      mainLocalId: newLocal.id
    }
  })

}

export { getMyCompanies, getOneCompanyWithRelations, postCompany }