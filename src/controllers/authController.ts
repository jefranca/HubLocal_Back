import { NextFunction, Request, Response } from 'express';
import { validateUser } from '../validations/user';

import * as authService from "../services/authServices"


async function signUp(req: Request, res: Response, next: NextFunction) {
  const user = req.body;

  try {
    const validation = await validateUser(user);
    await authService.signUp(user)
    res.sendStatus(201);
  } catch (error: any) {
    if (error.name === "ValidationError") return res.status(400).send(error.message)
    if (error.name === "AccountDuplicated") return res.status(409).send(error.message)
    next(error);
  }
}

async function signIn(req: Request, res: Response, next: NextFunction) {
  const user = req.body;

  try {
    const validation = await validateUser(user);
    await authService.signIn(user)
    res.sendStatus(200);
  } catch (error: any) {
    if (error.name === "ValidationError") return res.status(400).send(error.message)
    if (error.name === "EmaildDoesNotExist") return res.status(404).send(error.message)
    if (error.name === "WrongEmailOrPassword") return res.status(401).send(error.message)
    next(error);
  }
}

async function logout(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split('Bearer ')[1];

  try {
    await authService.logout(token)
    res.sendStatus(200);
  } catch (error: any) {
    next(error);
  }
}

export { signUp, signIn, logout }