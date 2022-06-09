const express = require('express');

const UserServices = require('./../services/user.service')
const validatorUser = require('./../middlewares/validator.handler')
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user.schema')

const users = express.Router();

const service = new UserServices();

// listo-------------------------------------------------
users.get('/', async(req, res) => {
    const userss = await  service.find();
    res.json(userss);
  }
);
// listo-------------------------------------------------



users.get('/filter', (req, res) => {
  res.send('Yo soy un filter')
})



// buscar un usuario en especifico-----------------------
users.get('/:id',
  validatorUser(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(parseInt(id));
      res.json(user);
    } catch (error) {
      next(error);
    }
})
// listo-------------------------------------------------



//crear un nuevo Usuario---------------------------------
users.post('/',
  validatorUser(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json (newUser);
});
//listo--------------------------------------------------

//inicio de sesion---------------------------------------
users.post('/login',
  validatorUser(updateUserSchema, 'body'),
  (req, res) => {
    const body = req.body
    const userLogin = service.loginOne(body.email, body.password);
    if(userLogin){
      res.status(201).json({message: "welcome"})
    } else{
      res.status(404).json({message: "User not exist"})
    }
})
//listo--------------------------------------------------

// actulizar un usuario en especifico
users.patch('/:id',
  validatorUser(getUserSchema, 'params'),
  validatorUser(updateUserSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(parseInt(id), body);
    res.json (user);
  } catch (error) {
    next(error);
  }
})
// listo--------------------------------------------------



// eliminar un usuario---------------------------------
users.delete('/:id', async(req, res) => {
  const { id } = req.params;
  const rta = await service.delete(parseInt(id))
  res.json (rta);
})
//listo------------------------------------------------



module.exports = users;
