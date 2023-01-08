import { RequestHandler } from "express";
import { HttpException } from "@entity/HttpException";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { sanitize } from "class-sanitizer";

export function ValidationMiddleware(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req, res, next) => {
    const dtoObj = plainToInstance(type, req.body);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors
            .map((error: ValidationError) =>
              (Object as any).values(error.constraints)
            )
            .join(", ");
          next(new HttpException(400, dtoErrors));
        } else {
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      }
    );
  };
}
