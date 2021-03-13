import config from '../config'

function init(): any {
    const admin = require('firebase-admin');
    admin.initializeApp({
        credential: admin.credential.cert(config.fire_store.serviceAccount)
    })

    return admin.firestore();
}

const db = init();

export default db;