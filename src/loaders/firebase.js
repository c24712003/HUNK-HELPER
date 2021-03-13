"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
function init() {
    const admin = require('firebase-admin');
    admin.initializeApp({
        credential: admin.credential.cert(config_1.default.fire_store.serviceAccount)
    });
    return admin.firestore();
}
const db = init();
exports.default = db;
//# sourceMappingURL=firebase.js.map