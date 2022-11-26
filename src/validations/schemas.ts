import joi from 'joi';

const userSchema = joi.object({
  email: joi.string().pattern(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/i).required(),
  password: joi.string().min(4).max(32).required(),
});

export {userSchema};