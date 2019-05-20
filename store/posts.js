import firebase from '~/firebase/firebase-app.js';

export const state = () => ({
  loadedPosts: []
});

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts;
  },
  addPost(state, post) {
    state.loadedPosts.push(post);
  },
  editPost(state, editedPost) {
    const idx = state.loadedPosts.findIndex(post => post.id === editedPost.id);
    state.loadedPosts[idx] = editedPost;
  }
};

export const actions = {
  setPosts(vuexContext, posts) {
    vuexContext.commit('setPosts', posts);
  },
  addPost(vuexContext, post) {
    console.log('[Store] - Add Post ');
    return firebase
      .database()
      .ref('posts')
      .push(post)
      .then(result => {
        const key = result.key;
        vuexContext.commit('addPost', {
          ...post,
          id: key
        });
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    // return axios
    //   .post(process.env.FIREBASE_BASE_URL + '/posts.json', post)
    //   .then(function(response) {
    //     console.log(response);
    //     vuexContext.commit('addPost', { ...post, id: response.data.name });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  },
  editPost(vuexContext, editedPost) {
    var updates = {};
    updates['/posts/' + editedPost.id] = editedPost;

    return firebase
      .database()
      .ref()
      .update(updates)
      .then(result => {
        vuexContext.commit('editPost', editedPost);
      })
      .catch(error => {
        console.log(error);
      });

    // return axios
    //   .put(
    //     process.env.FIREBASE_BASE_URL + '/posts/' + editedPost.id + '.json',
    //     editedPost
    //   )
    //   .then(function(response) {
    //     // handle success
    //     console.log(response);
    //     vuexContext.commit('editPost', editedPost);
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     console.log(error);
    //   });
  }
};

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  }
};
