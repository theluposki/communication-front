<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../../../stores/user.js";
import { useActionImageProfileLayoutStore } from "../../../stores/actionImageProfileLayout.js";
import panelOptions from "./panelOptions.vue";

const userStore = useUserStore();
const ActionImageProfileLayoutStore = useActionImageProfileLayoutStore();

const user = computed(() => userStore.user);
const activeOptions = computed(
  () => ActionImageProfileLayoutStore.activeOptions
);
</script>

<template>
  <div class="user">
    <div
      class="imageProfile"
      @click="ActionImageProfileLayoutStore.fnOptionsToggle"
    >
      <!-- <img
        v-if="user.picture"
        :src="`https://localhost:3004${user.picture.imageSmall}`"
        alt="image user"
      /> -->

      <img
        v-if="user.picture"
        src="https://i.pravatar.cc/150?img=32"
        alt="image user"
      />

      
    </div>

    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      mode="out-in"
    >
      <panelOptions v-if="activeOptions" />
    </transition>
  </div>
</template>

<style scoped>
.animate__animated.animate__fadeIn {
  --animate-duration: 0.5s;
}
.animate__animated.animate__fadeOut {
  --animate-duration: 0.5s;
}
.user {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imageProfile {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 50px;
  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: center;

  background: repeating-conic-gradient(
    from var(--a),
    var(--current-primary) 0%,
    var(--current-primary) 5%,
    transparent 5%,
    transparent 40%,
    var(--current-primary) 50%
  );
  animation: animateIP 4s linear infinite;

  cursor: pointer;
}

@property --a {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
@keyframes animateIP {
  0% {
    --a: 0deg;
  }

  100% {
    --a: 360deg;
  }
}

.imageProfile::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;

  background: repeating-conic-gradient(
    from var(--a),
    var(--current-secondary) 0%,
    var(--current-secondary) 5%,
    transparent 5%,
    transparent 40%,
    var(--current-secondary) 50%
  );

  animation: animateIP 4s linear infinite;
  animation-delay: -1s;
}

.imageProfile:hover {
  animation: animateIP 3s linear infinite;
}

.imageProfile:hover:before {
  animation: animateIP 3.2s linear infinite;
}

.imageProfile:active {
  scale: 0.96;
}

.imageProfile img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50px;
  z-index: 1;
  border: solid 2px var(--dark2);
  filter: grayscale(0.2);
}
</style>
