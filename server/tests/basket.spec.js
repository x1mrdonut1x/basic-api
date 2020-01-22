const request = require('supertest')
const jwt = require('jsonwebtoken')

const {
  readObject,
  writeObject,
} = require('../utils')

const accessToken = jwt.sign({
  id: "user-1"
}, process.env.TOKEN_SECRET)

let products = [{
  "id": "prod-1",
  "name": "bike",
  "price": "10",
}, {
  "id": "prod-2",
  "name": "car",
  "price": "20",
}]

let data = {
  users: [{
    "id": "user-1",
    "firstName": "John",
    "lastName": "Doe",
    "basket": ["prod-1", "prod-2"]
  }],
  products
}

const service = {
  read: readObject(data),
  write: writeObject
}

const app = require('../index.js')(service)

describe('/user/basket', () => {

  it('returns a list of products', async() => {
    const res = await request(app)
      .get('/user/basket')
      .set('Authorization', 'Bearer ' + accessToken)

    expect(res.body).toMatchObject(products)
  })

  it('returns a product', async() => {
    const res = await request(app)
      .get('/user/basket/prod-1')
      .set('Authorization', 'Bearer ' + accessToken)

    expect(res.body).toMatchObject(products[0])
  })

  it('returns 400 on no product', async() => {
    const res = await request(app)
      .get('/user/basket/prod-0')
      .set('Authorization', 'Bearer ' + accessToken)

    expect(res.statusCode).toBe(400)
  })

  it('adds product to basket', async() => {
    const res = await request(app)
      .post('/user/basket')
      .set('Authorization', 'Bearer ' + accessToken)
      .send({
        id: 'prod-1'
      })

    expect(res.body).toMatchObject(["prod-1", "prod-2", "prod-1"])
  })


  it('remove product from basket', async() => {
    const res = await request(app)
      .delete('/user/basket/prod-1')
      .set('Authorization', 'Bearer ' + accessToken)

    expect(res.body).toMatchObject(['prod-2', 'prod-1'])
  })

})