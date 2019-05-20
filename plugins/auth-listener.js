import * as firebase from 'firebase';

export default ({ store }) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      const newUser = {
        id: user.uid
      };
      store.dispatch('auth/autoSignIn', newUser);
    }
  });
};
