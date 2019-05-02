import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      loadedPosts: []
    }),
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return new Promise((resolve, reject) =>
          setTimeout(() => {
            vuexContext.commit('setPosts', [
              {
                id: '1',
                title: 'Serious stuff',
                preview: 'Are you interessted...',
                thumbnail:
                  'https://miro.medium.com/max/960/1*wqmBDlLR8LKYboTnpPSn0A.jpeg'
              },
              {
                id: '2',
                title: 'Serious stuff',
                preview: 'Are you interested...',
                thumbnail:
                  'https://miro.medium.com/max/960/1*wqmBDlLR8LKYboTnpPSn0A.jpeg'
              },
              {
                id: '3',
                title: 'Serious stuff',
                preview: 'Are you interessted...',
                thumbnail:
                  'https://miro.medium.com/max/960/1*wqmBDlLR8LKYboTnpPSn0A.jpeg'
              }
            ]);
            resolve();
          }, 1000)
        );
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
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
