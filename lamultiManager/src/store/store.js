import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      isAuthenticated: false,
      firestore: null,
    };
  },
  mutations: {
    setAuth(state, value) {
      state.isAuthenticated = value;
    },
    setFirestore(state, firestore) {
      state.firestore = firestore;
    },
  },
});