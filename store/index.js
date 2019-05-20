import firebase from '~/firebase/firebase-app.js';

export const state = () => ({
  loading: false
});

export const mutations = {
  setLoading(state, setLoading) {
    state.loading = setLoading;
  }
};

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return firebase
      .database()
      .ref('posts')
      .once('value')
      .then(data => {
        const posts = [];
        const obj = data.val();
        for (let key in obj) {
          posts.push({
            id: key,
            title: obj[key].title,
            author: obj[key].author,
            thumbnailLink: obj[key].thumbnailLink,
            updated: obj[key].updated,
            content: obj[key].content,
            previewContent: obj[key].previewContent
          });
        }
        vuexContext.commit('posts/setPosts', posts);
      })
      .catch(error => {
        console.log(error);
      });

    // return axios
    //   .get(process.env.FIREBASE_BASE_URL + '/posts.json')
    //   .then(function(response) {
    //     // handle success
    //     let posts = [];
    //     for (let key in response.data) {
    //       posts.push({ ...response.data[key], id: key });
    //     }
    //     vuexContext.commit('posts/setPosts', posts);
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     console.log(error);
    //   });
  },
  setLoading(vuexContext, setLoading) {
    vuexContext.commit('setLoading', setLoading);
  }
};
