<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../../stores/user.js";
import actionImageProfile from "./optionsProfile/actionImageProfile.vue"
import viewImageProfile from "./optionsProfile/viewImageProfile.vue";
import { useActionImageProfileLayoutStore } from "../../stores/actionImageProfileLayout.js";

const userStore = useUserStore();
const ActionImageProfileLayoutStore = useActionImageProfileLayoutStore();

const user = computed(() => userStore.user);
const activeViewImage = computed(
  () => ActionImageProfileLayoutStore.activeViewImage
);
</script>

<template>
  <header>
    <div class="back">beck</div>
    <actionImageProfile v-if="user.picture" />

    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <viewImageProfile v-if="activeViewImage" />
    </transition>
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
