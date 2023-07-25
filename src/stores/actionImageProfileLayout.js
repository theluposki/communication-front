import { defineStore } from "pinia";
import { ref } from "vue";

export const useActionImageProfileLayoutStore = defineStore(
  "actionImageProfileLayout",
  () => {
    const activeOptions = ref(false);
    const activeViewImage = ref(false);

    const fnCloseAll = () => {
      activeOptions.value = false;
      activeViewImage.value = false;
    };

    const fnOptionsToggle = () => {
      if (activeOptions.value) {
        fnCloseAll();
        return;
      }
      fnCloseAll();
      activeOptions.value = true;
    };

    const fnViewImageToggle = () => {
      if (activeViewImage.value) {
        fnCloseAll();
        return;
      }
      fnCloseAll();
      activeViewImage.value = true;
    };

    return {
      activeOptions,
      fnOptionsToggle,
      fnCloseAll,
      activeViewImage,
      fnViewImageToggle,
    };
  }
);
