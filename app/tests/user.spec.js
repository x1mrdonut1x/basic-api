const request = require('supertest')
const bcrypt = require('bcryptjs');

const {
  readObject,
  writeObject,
} = require('../utils')

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('dupadupa1', salt);

let data = {
  users: [{
    "id": "user-1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "foo2@bar.com",
    "password": hash,
    "basket": []
  }]
}
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItMSIsImlhdCI6MTU3OTU5Nzg5MH0.im03Y1aNkYfIvLN_mTlg2W6MvT8dwaJonpYU3j9nG6M"

const service = {
  read: readObject(data),
  write: writeObject
}

const app = require('../server.js')(service)

describe('/user-', () => {

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
      .send({
        email: "foo@bar.com"
      })

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
})