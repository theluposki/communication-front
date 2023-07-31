<script setup>
import { onMounted, computed } from "vue";
import HeaderM from "./components/Layout/header.vue";
import MainM from "./components/Layout/main.vue";
import FooterM from "./components/Layout/footer.vue";
import Wrapper from "./components/Login/wrapper.vue"
import { decryptValue } from "./utils/crypto.js";

import { useUserStore } from "./stores/user.js";

const userStore = useUserStore();

const user = computed(() => userStore.user);

onMounted(() => {
  if (localStorage.getItem("favoriteColor")) {
    const favoriteColor = JSON.parse(
      decryptValue(localStorage.getItem("favoriteColor"))
    );
    document.documentElement.style.setProperty(
      "--current-secondary",
      favoriteColor.currentSecondary
    );
    document.documentElement.style.setProperty(
      "--current-primary",
      favoriteColor.currentPrimary
    );
  }

  if(localStorage.getItem("profile")) {
    userStore.user = JSON.parse(decryptValue(localStorage.getItem("profile")))
  }
});
</script>

<template>
  <Wrapper v-if="!user.id"/>
  <HeaderM v-if="user.id"/>
  <MainM  v-if="user.id"/>
  <FooterM v-if="user.id"/>
</template>

