import { NextFunction, Request, Response } from "express";
import { HttpException } from "@entity/HttpException";

export function errorMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  response.status(status).json({
    success: false,
    data: message,
  });
  next(error);
}
