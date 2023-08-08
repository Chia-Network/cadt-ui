const net = require('net');
const childProcess = require('child_process');

const port = process.env.PORT ? process.env.PORT - 100 : 3001;
process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();
let startedElectron = false;

client.on('connect', () => {
  if (!startedElectron) {
    console.log('starting electron');
    startedElectron = true;
    const { exec } = childProcess;
    exec('npm run electron');
  }
});

client.on('error', error => {
  console.log('Connection Failed, Retrying...', error);
  client.end();
  setTimeout(() => client.connect({ port, host: '0.0.0.0' }), 1000);
});

// Initiate the connection
client.connect({ port, host: '0.0.0.0' });
