<template>
  <main>
    <router-view v-slot="{ Component }">
      <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
.animate__animated.animate__slideInLeft {
  --animate-duration: 0.5s;
}
.animate__animated.animate__slideOutLeft {
  --animate-duration: 0.5s;
}
.animate__animated.animate__slideInRight {
  --animate-duration: 0.5s;
}
.animate__animated.animate__slideOutRight {
  --animate-duration: 0.5s;
}
.animate__animated.animate__fadeIn {
  --animate-duration: 0.5s;
}
.animate__animated.animate__fadeOut {
  --animate-duration: 0.5s;
}

main {
  position: fixed;
  top: 60px;
  left: 0;
  min-width: 100%;
  min-height: calc(100vh - 120px);
  background-color: transparent;
}
</style>
