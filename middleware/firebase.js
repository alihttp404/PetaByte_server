const admin = require('firebase-admin');

const serviceAccount = require('/etc/secrets/petabyte-b96f9-d2aa521c6930.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
