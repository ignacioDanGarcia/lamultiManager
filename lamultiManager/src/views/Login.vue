<template>
    <div class="login-container">
      <h1 class="login-title">Login</h1>
      <input v-model="password" type="password" placeholder="Enter password" class="password-input" />
      <button @click="login" class="login-button">Login</button>
   </div>
  </template>
  
  <script>
  import config from '../config.js';

  export default {
    data() {
      return {
        password: '',
      };
    },
    methods: {
      login() {
        if (this.password === config.password) {
          // Contraseña correcta, redirige a la página principal
            this.$store.commit('setAuth', true);
            this.$router.push('/home');
        } else {
          // Contraseña incorrecta, puedes mostrar un mensaje de error
          alert('Contraseña incorrecta');
        }
      },
    },
  };
  </script>
  <style>
  body {
    margin: 0;
    padding: 0;
    background-color: rgb(0, 0, 0);
    color: white;
  }
  .login-container {
    text-align: center;
    margin-top: 50px;
  }

  .login-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .password-input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #4CAF50;
    border-radius: 5px;
  }

  .login-button {
    margin-left: 10px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>