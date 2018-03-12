const spawn = require('child_process').spawn;

let backendProcess = spawn('gulp', { cwd: process.cwd() + '/rest-server' });

backendProcess.on('close', () => {
    console.info('backendProcess closing... re-opening.')
    backendProcess = spawn('gulp', { cwd: process.cwd() + '/rest-server' });
});

backendProcess.stdout.on('data', (data) => {
    console.log('backendProcess: ' + data.toString('utf8'));
});

backendProcess.stderr.on('error', (error) => {
    console.error('backendProcess: ' + error.toString('utf8'));
});

process.on('beforeExit', () => {
    backendProcess.exit();
});


