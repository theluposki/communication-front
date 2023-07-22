<script setup>
import { ref } from 'vue'
import { socket } from '../socket.io.js';

const connect = () => {
  socket.emit("user_connected", { user: "Luposki " })
}

const disconnect = () => {
  socket.emit("user_disconnected", { user: "Luposki " })
}

</script>

<template>
  <h1>APP</h1>
  {{ PORT }}
  <button @click="connect">Conectar</button>
  <button @click="disconnect">Desconectar</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
