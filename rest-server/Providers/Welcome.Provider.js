const { Provider } = require('epitome-core');

module.exports = class WelcomeProvider extends Provider {
  initialize(next) {
    console.log('Welcome to the developer challenge solution by Dewald Laubscher :)');
  }
}
