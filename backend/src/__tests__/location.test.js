const request = require('supertest');
const app = require('../app');
const controller = require('../controllers/location');
app.use('/locations', controller);

//==================== user API test ====================

// test to get all locations
describe('GET /locations', () => {
  test('It should return with json containing a list of all locations', async () => {
    const response = await request(app).get('/locations')
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    const locations = JSON.parse(response.text)
    });
});



// test to get a location endpoint by giving an existing location
describe('GET /locations:id', () => {
  test('It should return with json containing the requested location', async () => {
    const response = await request(app).get('/locations:id')
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    const location = JSON.parse(response.text)
    expect(location.length).toEqual(1)
    });
});


// test to get a location endpoint by giving a non-existing location
describe('GET /locations/:id', () => {
  test('It should return json location not found', async () => {
    await request(app)
    .get('/locations:invalidid')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404) //expecting HTTP status code
    .expect('"location not found"') // expecting content value
    .end((err) => {
        if (err) return done(err);
        done();
    });
    });
});
