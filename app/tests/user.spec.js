require('dotenv').config()
const request = require('supertest')

const {
  readObject,
  writeObject,
} = require('../utils')

const {
  hashPassword
} = require('../utils')

const jwt = require('jsonwebtoken');
const accessToken = jwt.sign({
  id: "user-1"
}, process.env.TOKEN_SECRET)

const pass = hashPassword('dupadupa1')
let data = {
  users: [{
    "id": "user-1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "foo2@bar.com",
    "password": pass,
    "basket": []
  }]
}

const service = {
  read: readObject(data),
  write: writeObject
}

const app = require('../server.js')(service)

describe('/user', () => {

  it('return 400 on wrong user id', async() => {
    const res = await request(app)
      .get('/user/user-2')
      .set('Authorization', 'Bearer ' + accessToken)

    expect(res.statusCode).toEqual(400)
  })

  it('return 401 on wrong token', async() => {
    const res = await request(app)
      .get('/user/user-1')
      .set('Authorization', 'Bearer ' + 'wrong')

    expect(res.statusCode).toEqual(403)
  })

  it('show user data', async() => {
    const res = await request(app)
      .get('/user/user-1')
      .set('Authorization', 'Bearer ' + accessToken)

    expect(res.body).toMatchObject({
      "firstName": "John",
      "lastName": "Doe",
      "email": "foo2@bar.com",
    })
  })

  it('change user password', async() => {
    const res = await request(app)
      .put('/user/user-1')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        password: 'new'
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body.password).not.toBe(pass)
  })

  it('change user firstName', async() => {
    const res = await request(app)
      .put('/user/user-1')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        firstName: 'new'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.firstName).toBe('new')
  })

  it('change user lastName', async() => {
    const res = await request(app)
      .put('/user/user-1')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        lastName: 'new'
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body.lastName).toBe('new')
  })
})