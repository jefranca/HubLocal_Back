
import ValidationError from "../errors/ValidationError";
import { user } from "../interfaces/user";
import * as schemas from "./schemas";

async function validateUser(user: user) {
  const joiValidation = schemas.userSchema.validate(user);
  if (joiValidation.error)
    throw new ValidationError(joiValidation.error.details[0].message);
}

export { validateUser };