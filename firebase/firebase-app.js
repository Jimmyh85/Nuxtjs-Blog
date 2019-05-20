import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};

export default (!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app());
