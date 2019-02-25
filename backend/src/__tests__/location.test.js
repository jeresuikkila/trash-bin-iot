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
    const response = await request(app).get('/locations:1')
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
    .expect(404)
    .expect('"location not found"')
    .end((err) => {
        if (err) return done(err);
        done();
    });
  });
});

// testing post location endpoint
describe('POST /locations', function () {
  let location = {
      "id": 16,
      "address": "KEMISTINTIE 1, 02150, Espoo",
      "lat": 60.18364,
      "lng": 24.82472
  }
  it('respond with 201 created', function (done) {
      request(app)
          .post('/locations')
          .send(location)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });
});

// testing post location endpoint with invalid data
describe('POST /events', function () {
  let location = {
      // id missing
      "address": "KONEMIEHENTIE 1, 02150, Espoo",
      "lat": 60.1873,
      "lng": 24.82339
  }
  it('respond with 400 not created', function (done) {
      request(app)
          .post('/locations')
          .send(location)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect('"location not created"')
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });
});
