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
    const response = await request(app).get('/trashbins:id')
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
