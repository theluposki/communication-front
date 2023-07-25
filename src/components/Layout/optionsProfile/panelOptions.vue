<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../../../stores/user.js";
import { useActionImageProfileLayoutStore } from "../../../stores/actionImageProfileLayout.js";
import { encryptValue } from "../../../utils/crypto.js";
import { toggleFullscreen } from "../../../utils/fullScreen.js";

const userStore = useUserStore();
const ActionImageProfileLayoutStore = useActionImageProfileLayoutStore();

const user = computed(() => userStore.user);
const activeOptions = computed(
  () => ActionImageProfileLayoutStore.activeOptions
);

const setColor = (color) => {
  const favoriteColor = {
    currentPrimary: color,
    currentSecondary: "#75e7fb",
    currentSecondaryDefault: "#535bf2",
  };
  if (color === favoriteColor.currentSecondaryDefault || color === '#7d2eaf') {
    document.documentElement.style.setProperty(
      "--current-secondary",
      favoriteColor.currentSecondary
    );
    document.documentElement.style.setProperty(
      "--current-primary",
      favoriteColor.currentPrimary
    );
    localStorage.setItem(
      "favoriteColor",
      encryptValue(JSON.stringify(favoriteColor))
    );
    return;
  }
  document.documentElement.style.setProperty("--current-secondary", "#535bf2");
  document.documentElement.style.setProperty(
    "--current-primary",
    favoriteColor.currentPrimary
  );
  localStorage.setItem(
    "favoriteColor",
    encryptValue(JSON.stringify(favoriteColor))
  );
};
</script>

<template>
  <div class="panelOptions">
    <div class="opt">
        <i class='bx bxs-user-circle' ></i>
        Perfil
    </div>
    <div class="opt">
        <i class='bx bx-image-alt'></i>
        Ver Foto
    </div>
    <div class="opt" @click="toggleFullscreen">
        <i class='bx bx-fullscreen'></i>
        Tela cheia
    </div>
    <div class="opt">
        <i class='bx bx-log-out'></i>
        Sair
    </div>
    <div class="opt">
      <div class="color pink" @click="setColor('#ff2770')"></div>
      <div class="color blue" @click="setColor('#535bf2')"></div>
      <div class="color orange" @click="setColor('#fb8700')"></div>
      <div class="color green" @click="setColor('#94ff00')"></div>
      <div class="color yellow" @click="setColor('#fbaa13')"></div>
      <div class="color roxo" @click="setColor('#7d2eaf')"></div>

    </div>
  </div>
</template>

<style scoped>
.panelOptions {
  position: absolute;
  top: 22px;
  left: -158px;
  min-width: 120px;
  min-height: 120px;
  background-color: var(--dark2);
  border: solid 2px var(--current-primary);
  border-radius: 6px 30% 6px 6px;
  box-shadow: inset 0 0 6px var(--current-primary);
  z-index: 1;
  padding: 6px;

  display: flex;
  flex-direction: column;
  gap: 6px;
}

.opt:nth-child(1) {
  border-radius: 4px 50px 4px 4px;
  margin-right: 8px;
}
.opt {
  background-color: var(--dark);
  border-radius: 4px;
  min-height: calc(120px / 3);
  padding: 0 12px;

  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
}

.opt:hover {
  color: var(--current-primary);
}

.color {
  transition: all ease 0.4s;
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  outline: solid 3px transparent;
  border: solid 2px transparent;
}

.color:hover {
  outline: solid 3px var(--dark2);
  border: solid 2px var(--dark);
}

.color:active {
  scale: 0.92;
}
</style>
