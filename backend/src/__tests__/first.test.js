// we will use supertest to test HTTP requests/responses
const request = require('supertest')
// we also need our app for the correct routes!
const app = require('../app')

describe('GET / ', () => {
  test('It should respond with a hello world message', async () => {
    const response = await request(app).get('/')
    expect(response.body).toEqual({ message: 'Hello World!' })
    expect(response.statusCode).toBe(200)
  })
})

describe('GET /location', () => {
  test('It should return two locations in JSON format', async () => {
    const response = await request(app).get('/location')
    expect(response.statusCode).toBe(200)
    // console.log(response.body)
    expect(response.type).toBe('application/json')
    const locations = JSON.parse(response.text)
    expect(locations.length).toEqual(2)
  })
})
