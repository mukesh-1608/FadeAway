const request = require('supertest');
const assert = require('assert');
// Change this line to 'server'
const app = require('../server'); // Make sure this points to your new server.js file

describe('FadeAway API Tests', () => {
  // Test the root endpoint
  it('should return "Hello, World!" on GET /', (done) => {
    request(app)
      .get('/')
      .expect(200) // Expect HTTP status 200 (OK)
      .end((err, res) => {
        if (err) return done(err);
        // Assert that the response body is "Hello, World!"
        assert.strictEqual(res.text, 'Hello, World!');
        done(); // Call done() to signal that the test is complete
      });
  });

  // Test a non-existent route
  it('should return 404 for a non-existent route', (done) => {
    request(app)
      .get('/nonexistent')
      .expect(404) // Expect HTTP status 404 (Not Found)
      .end(done); // Call done() as the test is complete
  });
});