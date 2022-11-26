import bcrypt from 'bcrypt';
import { user } from '../interfaces/user';
import { v4 as uuid } from 'uuid';
import pkg from "@prisma/client";

import AccountDuplicated from '../errors/AccountDuplicated';
import EmaildDoesNotExist from '../errors/EmaildDoesNotExist';
import WrongEmailOrPassword from '../errors/WrongEmailOrPassword';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();


async function signUp({email,password}:user) {
  const hash = bcrypt.hashSync(password, 8);
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if(user) throw new AccountDuplicated("This e-mail is already being used.");

  await prisma.user.create({
    data: {
      email: email,
      password: hash
    },
  })
}

async function signIn({email,password}:user) {

  const user = await prisma.user.findUnique({
    where: { email }
  })

  console.log(user)

  if (!user)  throw new EmaildDoesNotExist("This e-mail does not exist");
  if (user && !bcrypt.compareSync(password, user.password))  throw new WrongEmailOrPassword("e-mail or password is invalid");

  const token = uuid();

  await prisma.session.create({
    data: {
      token: token,
      userId: user.id
    },
  })
}

export {signUp, signIn}