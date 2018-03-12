const fs = require('fs'),
    path = require('path'),
    { Provider } = require('epitome-core');
    
module.exports = class WelcomeProvider extends Provider {
    initialize(next) {
        next('Welcome to the code challenge implementation by Dewald Laubscher :)');
    }

    register(message) {
        console.log(message);
    }

    final() {
        console.log('...');
    }
}