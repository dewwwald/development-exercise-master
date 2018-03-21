const { Provider } = require('epitome-core');

module.exports = class WelcomeProvider extends Provider {
  initialize(next) {
    const app = this.container.make('app');
    app.use('/rest/*', function (request, response, next) {
      response.append('Access-Control-Allow-Headers', 'content-type, Accept');
      response.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, HEAD, OPTIONS, PUT, DELETE');
      response.append('Allow', 'GET, POST, PATCH, HEAD, OPTIONS, PUT, DELETE');
      response.append('Access-Control-Allow-Origin', 'http://localhost:3000');
      next();
    });
  }
}
