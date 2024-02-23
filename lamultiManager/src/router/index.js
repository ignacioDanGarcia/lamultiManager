import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/store.js';

import LoginView from '../views/Login.vue';
import HomeView from '../views/HomeView.vue';
import AsociarUsuarioView from '../views/AsociarUsuarioView.vue';
import ModificarEventosView from '../views/ModificarEventosView.vue';
import ModificarTitulosView from '../views/ModificarTitulosView.vue';
import ModificarProfesView from '../views/ModificarProfesView.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',
      name: 'LoginView',
      component: LoginView },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/asociar-usuario',
      name: 'AsociarUsuarioView',
      component: AsociarUsuarioView,
      meta: { requiresAuth: true },
    },
    {
      path: '/modificar-eventos',
      name: 'ModificarEventosView',
      component: ModificarEventosView,
      meta: { requiresAuth: true },
    },
    {
      path: '/modificar-titulos',
      name: 'ModificarTitulosView',
      component: ModificarTitulosView,
      meta: { requiresAuth: true },
    },
    {
      path: '/modificar-profes',
      name: 'ModificarProfesView',
      component: ModificarProfesView,
      meta: { requiresAuth: true },
    },
/*    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ]
})

// En main.js o donde configures tu aplicación
router.beforeEach((to, from, next) => {
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verificar si el usuario está autenticado usando Vuex
    if (!store.state.isAuthenticated) {
      // Si no está autenticado, redirige a la página de inicio de sesión
      next('/');
    } else {
      // Si está autenticado, permite el acceso a la ruta protegida
      next();
    }
  } else {
    // Si la ruta no requiere autenticación, permite el acceso
    next();
  }
});


export default router
