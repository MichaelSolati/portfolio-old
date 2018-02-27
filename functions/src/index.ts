import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

let serviceAccount;

try {
  serviceAccount = require('../serviceAccountKey.json');
} catch (e) { }

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://' + serviceAccount['project_id'] + '.firebaseio.com',
    storageBucket: serviceAccount['project_id'] + '.appspot.com'
  });
} else {
  admin.initializeApp(functions.config().firebase);
}

export { github } from './github';
export { linkedin } from './linkedin';
export { ssr } from './ssr';