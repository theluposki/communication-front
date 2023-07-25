import { defineStore } from "pinia";
import { ref } from "vue";

export const useActionImageProfileLayoutStore = defineStore(
  "actionImageProfileLayout",
  () => {
    const activeOptions = ref(false);

    const fnOptionsToggle = () => {
      if (activeOptions.value) {
        activeOptions.value = false;
        return;
      }
      activeOptions.value = true;
    };

    return { activeOptions, fnOptionsToggle };
  }
);
