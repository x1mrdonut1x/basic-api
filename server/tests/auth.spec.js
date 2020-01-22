const request = require('supertest')

const {
  readObject,
  writeObject,
} = require('../utils')

let data = {
  users: []
}

const service = {
  read: readObject(data),
  write: writeObject
}

const app = require('../server.js')(service)

describe('/auth', () => {

  it('should successfuly register', async() => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: "foo@bar.com",
        password: "dupadupa1"
      })

    expect(res.statusCode).toEqual(200)
  })

  it('should unsuccessfuly register', async() => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: "foo@bar.com",
        password: "dupadupa1"
      })

    expect(res.statusCode).toEqual(400)
  })

  it('send 401 when user does not exist', async() => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "im@not.there",
        password: "test"
      })

    expect(res.statusCode).toEqual(400)
  })

  it('should unsuccesfully login', async() => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "foo@bar.com",
        password: "wrongpass"
      })

    expect(res.statusCode).toEqual(401)
  })

  it('should succesfully login', async() => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: "foo@bar.com",
        password: "dupadupa1"
      })
    expect(res.statusCode).toEqual(200)
  })
})