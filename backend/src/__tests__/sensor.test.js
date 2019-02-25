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
    const response = await request(app).get('/sensors:1')
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

// testing post sensor endpoint
describe('POST /sensors', function () {
    let sensor = {
        "id": 44,
        "default_pitch": 5,
        "default_roll": 7,
        "taglocation": "lid",
        "battery": 95.0,
        "lat": 60.18742,
        "lng": 24.82247

    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/sensors')
            .send(sensor)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

// testing post sensor endpoint with invalid data
describe('POST /sensors', function () {
  let sensor = {
      // id missing
      "default_pitch": 5,
      "default_roll": 7,
      "taglocation": "lid",
      "battery": 95.0,
      "lat": 60.18742,
      "lng": 24.82247

  }
  it('respond with 400 not created', function (done) {
      request(app)
          .post('/sensors')
          .send(sensor)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect('"sensor not created"')
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });
});
