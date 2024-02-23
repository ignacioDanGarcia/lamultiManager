import './assets/css/bootstrap.min.css';
import './assets/css/dataTables.bootstrap5.min.css';
import './assets/css/style.css';
import './assets/js/bootstrap.bundle.min.js';
import './assets/js/jquery-3.5.1.js';
import './assets/js/jquery.dataTables.min.js';
import './assets/js/dataTables.bootstrap5.min.js';
import './assets/js/scriptChart.js';

import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store.js';
import router from './router';

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBiWNKU1XQWPCsx7ddE4A-HZz_ATwD-A_c",
    authDomain: "multiforme-prueba.firebaseapp.com",
    projectId: "multiforme-prueba",
    storageBucket: "multiforme-prueba.appspot.com",
    messagingSenderId: "392964231935",
    appId: "1:392964231935:web:754130ecd56d54dabe72ca"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
  

const app = createApp(App);

store.commit('setFirestore', firestore);

app.use(store);
app.use(router);
app.mount('#app');
