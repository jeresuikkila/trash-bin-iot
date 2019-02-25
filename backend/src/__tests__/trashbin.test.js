const request = require('supertest');
const app = require('../app');
const controller = require('../controllers/trashbin');
app.use('/trashbins', controller);

//==================== user API test ====================

// test to get all trashbins
describe('GET /trashbins', () => {
  test('It should return with json containing a list of all trashbins', async () => {
    const response = await request(app).get('/trashbins')
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    const trashbins = JSON.parse(response.text)
    });
});



// test to get a trashbin endpoint by giving an existing trashbin
describe('GET /trashbins:id', () => {
  test('It should return with json containing the requested trashbin', async () => {
    const response = await request(app).get('/trashbins:1')
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    const trashbin = JSON.parse(response.text)
    expect(trashbin.length).toEqual(1)
    });
});


// test to get a trashbin endpoint by giving a non-existing trashbin
describe('GET /trashbins/:id', () => {
  test('It should return json trashbin not found', async () => {
    await request(app)
    .get('/trashbins:invalidid')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404) //expecting HTTP status code
    .expect('"trashbin not found"') // expecting content value
    .end((err) => {
        if (err) return done(err);
        done();
    });
    });
});

// testing post trashbin endpoint
describe('POST /trashbins', function () {
  let trashbin = {
      "id": 56,
      "bintype": "biowaste",
      "owner": "HSY",
      "size": 80,
      "latestEmptied": 2019-12-02,
      "fillStatus": 45
  }
  it('respond with 201 created', function (done) {
      request(app)
          .post('/trashbins')
          .send(trashbin)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });
});

// testing post trashbin endpoint with invalid data
describe('POST /trashbins', function () {
  let trashbin = {
      // id
      "bintype": "biowaste",
      "owner": "HSY",
      "size": 80,
      "latestEmptied": 2019-15-02,
      "fillStatus": 45
  }
  it('respond with 400 not created', function (done) {
      request(app)
          .post('/trashbins')
          .send(trashbin)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect('"trashbin not created"')
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });
});
