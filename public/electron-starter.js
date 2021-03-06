const { app, ipcMain } = require('electron');
const log = require('./components/log');

const appManager = require('./components/appManager');
const { commonName } = require('secure-comms-api/sslConfig.js');

log.info('App starting...');
appManager.init();

const shouldQuit = app.makeSingleInstance((argv) => {
  appManager.openFileFromArgs(argv);
});

if (shouldQuit) {
  app.quit();
  return;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  appManager.start();
  appManager.loadDevTools();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (process.platform === 'darwin') {
    appManager.restore();
  }
});

app.on('open-file', (event, filePath) => {
  appManager.openFile(filePath);
});

const normalizeEol = str => str.replace(/\r\n|\r|\n/g, '\r\n');

// App must only add a certificate known to be from a trusted, paired Server.
// Cert will be considered when making https calls; see the 'certificate-error' handler.
const pretrustedCertificates = new Set();
ipcMain.on('add-cert', (evt, cert) => {
  pretrustedCertificates.add(normalizeEol(cert));
  evt.sender.send('add-cert-complete');
});

app.on('certificate-error', (event, webContents, requestedUrl, error, certificate, callback) => {
  const protocolMatch = requestedUrl.startsWith('https:');
  const nameMatch = certificate.subject.commonName === commonName;
  const rawCert = normalizeEol(certificate.data);
  if (nameMatch && protocolMatch && pretrustedCertificates.has(rawCert)) {
    event.preventDefault();
    callback(true);
  } else {
    log.warn('Unexpected certificate error', requestedUrl);
    log.error(error);
    // Calling `callback(false)` will cancel the request and prevent the error
    // from being given to XHR. With axios, this results in a silent failure.
    // Instead, allow the error to occur by not calling back.
  }
});
