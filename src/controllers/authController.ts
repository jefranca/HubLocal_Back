import { NextFunction, Request, Response } from 'express';
import { validateNewUser } from '../validations/newUser';

import * as authService from "../services/authServices"


async function signUp(req: Request, res: Response, next: NextFunction) {
  const user = req.body;

  try {
  const validation = await validateNewUser(user);
  await authService.signUp(user)
  res.sendStatus(201);
  } catch (error: any) {
    if (error.name === "ValidationError") return res.status(400).send(error.message)
    if (error.name === "AccountDuplicated") return res.status(409).send(error.message)
    next(error);
  }
}

export {signUp}