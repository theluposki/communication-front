<script setup>
import { onMounted } from "vue"
import HeaderM from "./components/Layout/header.vue"
import MainM from "./components/Layout/main.vue"
import FooterM from "./components/Layout/footer.vue"
import { decryptValue } from "./utils/crypto.js"
onMounted(() => {
  
  if(localStorage.getItem('favoriteColor')) {
    const favoriteColor = JSON.parse(decryptValue(localStorage.getItem('favoriteColor')))
    document.documentElement.style.setProperty('--current-secondary', favoriteColor.currentSecondary);
    document.documentElement.style.setProperty('--current-primary', favoriteColor.currentPrimary);
  }
})

</script>

<template>
  <HeaderM />
  <MainM />
  <FooterM />
</template> 

<style scoped>

</style>
