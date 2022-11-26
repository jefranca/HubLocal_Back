import bcrypt from 'bcrypt';
import { newUser } from '../interfaces/newUser';
import pkg from "@prisma/client";
import AccountDuplicated from '../errors/AccountDuplicated';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();


async function signUp({email,password}:newUser) {
  const hash = bcrypt.hashSync(password, 10);
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if(user) throw new AccountDuplicated("This e-mail is already being used.");

  await prisma.user.create({
    data: {
      email: email,
      password: password
    },
  })
}

export {signUp}