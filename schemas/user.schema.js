const joi = require('joi');

const id = joi.number()
const name = joi.string().min(5).max(20);
const email = joi.string().min(10).max(25);
const password = joi.string().min(10).max(20)
const age = joi.number().integer();

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  age: age.required(),
})

const updateUserSchema = joi.object({
  name: name,
  email: email,
  password: password,
})

const getUserSchema = joi.object({
  id: id.required()
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema}
