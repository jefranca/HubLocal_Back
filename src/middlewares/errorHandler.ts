import { Request, Response, NextFunction } from "express";

export default async function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  return res.sendStatus(500);
}