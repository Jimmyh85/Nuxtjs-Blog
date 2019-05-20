import firebase from '~/firebase/firebase-app.js';

export const state = () => ({
  user: null
});

export const mutations = {
  setUser(state, user) {
    console.log('[Store] setUser called');
    state.user = user;
  }
};
export const getters = {
  isAuthenticated(state) {
    return !!state.user;
  }
};
export const actions = {
  signInWithEmailAndPassword(vueContext, payload) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        const newUser = {
          id: response.user.uid
        };
        vueContext.commit('setUser', newUser);
        vueContext.router;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  },
  signOut(vuexContext) {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        vuexContext.commit('setUser', null);
      });
  },
  autoSignIn({ commit }, payload) {
    commit('setUser', payload);
  }
};
