import pkg from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split('Bearer ')[1];
  const session = await prisma.session.findUnique({
    where: {
      token
    }
  });

  if (!session) {
    return res.status(401).send('Invalid token!');
  }

  res.locals.userId = session.userId;

  next();
}