<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const { push, currentRoute } = useRouter();

const pathname = computed(() => currentRoute.value.fullPath);

const setLink = (link) => {
  push(link);
  storeLayout.fnActiveMenu();
};
</script>

<template>
  <footer>
    <div
      @click="setLink('/')"
      :class="pathname === '/' ? 'nav-link active' : 'nav-link'"
    >
      <i class="bx bx-home-alt-2"></i>
    </div>
    <div
      @click="setLink('/about')"
      :class="pathname === '/about' ? 'nav-link active' : 'nav-link'"
    >
      <i class="bx bx-info-square"></i>
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;

  background-color: var(--dark2);
  min-height: 60px;
  min-width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.nav-link {
  background-color: var(--dark);
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 26px;
  border-radius: 6px;
  cursor: pointer;
  border: solid 2px transparent;
  color: var(--current-primary);
}

.nav-link i {
  filter: drop-shadow(2px -1px 0px var(--dark2));
}

.nav-link:hover {
  transition: all ease 0.4s;
  box-shadow: inset 0 0 3px var(--current-primary);
}

.nav-link:active {
  scale: 0.96;
}

.active {
    background-color: var(--current-primary);
    color: var(--white);
}

.active i {
  filter: drop-shadow(4px 4px 2px var(--dark));
}

.active:hover {
  transition: all ease 0.4s;
  box-shadow: inset 0 0 6px var(--dark2);
}
</style>
