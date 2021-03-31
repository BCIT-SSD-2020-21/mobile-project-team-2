import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import config from '../../config';

const firebaseConfig = {
    apiKey: config.firebaseConfig.APIKEY,
    authDomain: config.firebaseConfig.AUTHDOMAIN,
    databaseURL: config.firebaseConfig.DATABASEURL,
    projectId: config.firebaseConfig.PROJECTID,
    storageBucket: config.firebaseConfig.STORAGEBUCKET,
    messagingSenderId: config.firebaseConfig.MESSAGINGSENDERID,
    appId: config.firebaseConfig.APPID,
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };