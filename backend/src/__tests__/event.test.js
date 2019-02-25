const request = require('supertest');
const app = require('../app');
const controller = require('../controllers/event');
app.use('/events', controller);

//==================== user API test ====================

// test to get all events
describe('GET /events', () => {
  test('It should return with json containing a list of all events', async () => {
    const response = await request(app).get('/events')
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    const events = JSON.parse(response.text)
  });
});



// test to get an event endpoint by giving an existing event
describe('GET /event:id', () => {
  test('It should return with json containing the requested event', async () => {
    const response = await request(app).get('/events:1')
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe('application/json')
    const event = JSON.parse(response.text)
    expect(event.length).toEqual(1)
  });
});


// test to get an event endpoint by giving a non-existing event
describe('GET /event/:id', () => {
  test('It should return json event not found', async () => {
    await request(app)
    .get('/events:invalidid')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(404)
    .expect('"event not found"')
    .end((err) => {
        if (err) return done(err);
        done();
    });
  });
});


// testing post event endpoint
describe('POST /events', function () {
    let event = {
        "id": 22,
        "event_type": "lid opened",
        "event_time": "2019-11-02"
    }
    it('respond with 201 created', function (done) {
        request(app)
            .post('/events')
            .send(event)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

// testing post event endpoint with invalid data
describe('POST /events', function () {
    let event = {
        // no id
        "event_type": "lid opened",
        "event_time": "2019-12-02"
    }
    it('respond with 400 not created', function (done) {
        request(app)
            .post('/events')
            .send(event)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"event not created"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});
