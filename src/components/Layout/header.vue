<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../../stores/user.js";
import actionImageProfile from "./optionsProfile/actionImageProfile.vue"

const userStore = useUserStore();

const user = computed(() => userStore.user);

</script>

<template>
  <header>
    <div class="back">beck</div>
    <actionImageProfile v-if="user.picture" />
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;

  background-color: var(--dark2);
  min-height: 60px;
  max-height: 60px;
  min-width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 24px;
  z-index: 1;
}

</style>
