const request = require('supertest');
const app = require('../app');
const controller = require('../controllers/sensor');
app.use('/sensors', controller);

//==================== user API test ====================

// test to get all sensors
describe('GET /sensors', () => {
  test('It should return with json containing a list of all sensors', async () => {
    const response = await request(app).get('/sensors')
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    const sensors = JSON.parse(response.text)
    });
});



// test to get a sensor endpoint by giving an existing sensor
describe('GET /sensors:id', () => {
  test('It should return with json containing the requested sensor', async () => {
    const response = await request(app).get('/sensors:id')
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    const sensor = JSON.parse(response.text)
    expect(sensor.length).toEqual(1)
    });
});


// test to get a sensor endpoint by giving a non-existing sensor
describe('GET /sensors/:id', () => {
  test('It should return json sensor not found', async () => {
    await request(app)
    .get('/sensors:invalidid')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404) //expecting HTTP status code
    .expect('"sensor not found"') // expecting content value
    .end((err) => {
        if (err) return done(err);
        done();
    });
    });
});
