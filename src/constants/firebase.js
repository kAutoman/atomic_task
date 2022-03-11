import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFKOiohODALvCzKrBq4ue4fOkWJ2DH_5Q",
  authDomain: "atomic-task-4e592.firebaseio.com",
  projectId: "atomic-task-4e592",
  storageBucket: "atomic-task-4e592.appspot.com",
  messagingSenderId: "106199221549",
  appId: "1:106199221549:android:141149dba9400eda4abfa4",
  databaseURL : "https://atomic-task-4e592-default-rtdb.europe-west1.firebasedatabase.app"
};

let app;

if (firebase.apps.length === 0) {
  const firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

let database = firebase.database();
let uploadBytes = {};
export { db, auth, storage, database };