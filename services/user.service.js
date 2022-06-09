const boom = require('@hapi/boom')

class UserServices{
  constructor() {
    this.users = [],
    this.id = 0
  }

  async create(data) {
    this.id++
    const newUser = {
      id: this.id,
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users)
      }, 1000)
    })
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id);
    if(!user) {
      throw boom.notFound('User not found');
    }
    return user;
  };

  loginOne(email, password) {
    const user = this.users.find(item => item.email === email && item.password === password);
    return user
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id)
    if(index === -1) {
      throw boom.notFound('user not exist')
    }
    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('Product not exist');
    }
    const copi = this.users[index]
    this.users.splice(index, 1);
    return copi
  }
}

module.exports = UserServices
