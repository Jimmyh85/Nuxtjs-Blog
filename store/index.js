import axios from 'axios';
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      loadedPosts: []
    }),
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const idx = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[idx] = editedPost;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get(process.env.FIREBASE_BASE_URL + '/posts.json')
          .then(function(response) {
            // handle success
            let posts = [];
            for (let key in response.data) {
              posts.push({ ...response.data[key], id: key });
            }
            vuexContext.commit('setPosts', posts);
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      },
      addPost(vuexContext, post) {
        return axios
          .post(process.env.FIREBASE_BASE_URL + '/posts.json', post)
          .then(function(response) {
            console.log(response);
            vuexContext.commit('addPost', { ...post, id: response.data.name });
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      editPost(vuexContext, editedPost) {
        return axios
          .put(
            process.env.FIREBASE_BASE_URL + '/posts/' + editedPost.id + '.json',
            editedPost
          )
          .then(function(response) {
            // handle success
            console.log(response);
            vuexContext.commit('editPost', editedPost);
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
