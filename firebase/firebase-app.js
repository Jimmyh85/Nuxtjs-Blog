import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDx9EsM5HoL2DHbfAwmx01FWFjYuQzh3pA',
  authDomain: 'nuxtjs-blog-af759.firebaseapp.com',
  databaseURL: 'https://nuxtjs-blog-af759.firebaseio.com',
  projectId: 'nuxtjs-blog-af759',
  storageBucket: 'nuxtjs-blog-af759.appspot.com',
  messagingSenderId: '832603872964',
  appId: '1:832603872964:web:643d2be1e5154b25'
};

export default (!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app());
