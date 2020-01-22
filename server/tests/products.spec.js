const request = require('supertest')

const {
  readObject,
  writeObject,
} = require('../utils')


let data = {
  products: [{
    "id": "prod-1",
    "name": "bike",
    "price": "10",
  }]
}

const service = {
  read: readObject(data),
  write: writeObject
}

const app = require('../index.js')(service)

describe('/products', () => {

  it('returns a list of products', async() => {
    const res = await request(app)
      .get('/products')

    expect(res.body).toMatchObject([{
      "id": "prod-1",
      "name": "bike"
    }])
  })

  it('returns 400 when wrong id', async() => {
    const res = await request(app)
      .get('/products/prod-0')

    expect(res.statusCode).toEqual(400)
  })

  it('returns a product', async() => {
    const res = await request(app)
      .get('/products/prod-1')

    expect(res.body).toMatchObject({
      "id": "prod-1",
      "name": "bike"
    })
  })

  it('adds a product', async() => {
    const res = await request(app)
      .post('/products')
      .send({
        "name": "new",
        "price": "10"
      })

    expect(res.body).toMatchObject({
      "id": "prod-2",
      "name": "new",
      "price": "10"
    })
  })

  it('updates a product', async() => {
    const res = await request(app)
      .put('/products/prod-1')
      .send({
        "name": "new",
      })

    expect(res.body).toMatchObject({
      "id": "prod-1",
      "name": "new",
      "price": "10"
    })
  })

  
  it('remove product', async() => {
    const res = await request(app)
      .delete('/products/prod-1')

    expect(res.statusCode).toEqual(200)
  })

})