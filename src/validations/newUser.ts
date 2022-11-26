
import ValidationError from "../errors/ValidationError";
import { newUser } from "../interfaces/newUser";
import * as schemas from "./schemas";

async function validateNewUser(user: newUser) {
  const joiValidation = schemas.userSchema.validate(user);
  if (joiValidation.error)
    throw new ValidationError(joiValidation.error.details[0].message);
}

export { validateNewUser };