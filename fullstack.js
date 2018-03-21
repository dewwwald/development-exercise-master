const spawn = require('child_process').spawn;

let backendProcess = spawn('gulp', { cwd: process.cwd() + '/rest-server' }),
  frontendProcess;

backendProcess.on('close', () => {
    console.info('backendProcess closing... re-opening.')
    backendProcess = spawn('gulp', { cwd: process.cwd() + '/rest-server' });
});

backendProcess.stdout.on('data', (data) => {
    console.log('backendProcess: ' + data.toString('utf8'));
    if (!frontendProcess) {
      startFrontEnd();
    }
});

backendProcess.stderr.on('data', (error) => {
    console.error('backendProcess: ' + error.toString('utf8'));
});

function startFrontEnd() {
  frontendProcess = spawn('lite-server', { cwd: process.cwd() + '/front-end/build' });

  frontendProcess.on('close', () => {
    console.info('frontendProcess closing... re-opening.')
    frontendProcess = spawn('lite-server', { cwd: process.cwd() + '/front-end/build' });
  });

  frontendProcess.stdout.on('data', (data) => {
    console.log('frontendProcess: ' + data.toString('utf8'));
  });

  frontendProcess.stderr.on('data', (error) => {
    console.error('frontendProcess: ' + error.toString('utf8'));
  });
}

process.on('beforeExit', () => {
  backendProcess.exit();
  frontendProcess.exit();
});
