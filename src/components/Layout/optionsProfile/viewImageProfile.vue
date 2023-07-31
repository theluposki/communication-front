<script setup>
import { ref, computed } from "vue";
import { useActionImageProfileLayoutStore } from "../../../stores/actionImageProfileLayout.js";
import { useUserStore } from "../../../stores/user.js";
import config from "../../../config.js";
import { formatFileSize } from "../../../utils/formatFileSize.js";
import { api } from "../../../axios.js";
import axios from "axios";

const ActionImageProfileLayoutStore = useActionImageProfileLayoutStore();
const userStore = useUserStore();

const user = computed(() => userStore.user);

const currentImage = ref(
  `${config.BASE_URL}${
    user.value.picture[1] ? user.value.picture[1] : user.value.picture[0]
  }`
);

let editedImage, editedImageBlob, selectedImageFile;

const changeImage = async (e) => {
  const file = e.target.files[0];

  selectedImageFile = file;

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      currentImage.value = e.target.result;

      editedImage = new Image();
      editedImage.src = currentImage.value;
    };
    reader.readAsDataURL(file);
  }
};

function applyFilter() {
  if (editedImage) {
    const canvas = document.createElement("canvas");
    canvas.width = editedImage.width;
    canvas.height = editedImage.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(editedImage, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = data[i + 1] = data[i + 2] = average;
    }
    ctx.putImageData(imageData, 0, 0);

    // Substitui a imagem exibida pela imagem editada
    currentImage.value = canvas.toDataURL();
  }
}

function rotateRight() {
  if (editedImage) {
    const canvas = document.createElement('canvas');
    canvas.width = editedImage.height;
    canvas.height = editedImage.width;
    const ctx = canvas.getContext('2d');

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((90 * Math.PI) / 180);
    ctx.drawImage(editedImage, -editedImage.width / 2, -editedImage.height / 2);

    editedImage = new Image();
    editedImage.src = canvas.toDataURL();
    currentImage.value = editedImage.src;
  }
}

function rotateLeft() {
  if (editedImage) {
    const canvas = document.createElement('canvas');
    canvas.width = editedImage.height;
    canvas.height = editedImage.width;
    const ctx = canvas.getContext('2d');

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((-90 * Math.PI) / 180);
    ctx.drawImage(editedImage, -editedImage.width / 2, -editedImage.height / 2);

    editedImage = new Image();
    editedImage.src = canvas.toDataURL();
    currentImage.value = editedImage.src;
  }
}

function flipImage() {
  if (editedImage) {
    const canvas = document.createElement('canvas');
    canvas.width = editedImage.width;
    canvas.height = editedImage.height;
    const ctx = canvas.getContext('2d');

    // Inverte a imagem horizontalmente
    ctx.translate(editedImage.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(editedImage, 0, 0);

    editedImage = new Image();
    editedImage.src = canvas.toDataURL();
    currentImage.value = editedImage.src;
  }
}

function convertDataURIToBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const sendImage = async () => {
  editedImageBlob = convertDataURIToBlob(currentImage.value);

  const editedImageFile = new File([editedImageBlob], selectedImageFile.name, {
    lastModified: selectedImageFile.lastModified,
    type: selectedImageFile.type,
  });

  await uploadFileWithProgress(editedImageFile);
};

const uploadFileWithProgress = async (file) => {
  if (!file.type.startsWith("image/")) {
    alert("Selecione um arquivo de imagem válido.");
    return;
  }

  const formData = new FormData();
  formData.append("picture", file);

  let totalFull;
  try {
    const response = await axios.put(
      "https://localhost:3004/v1/profiles/upload",
      formData,
      {
        mode: "cors",
        cache: "no-cache",
        withCredentials: true,
        referrerPolicy: "origin",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          totalFull = progressEvent.total;
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          console.log(`${progress}% - ${totalFull}`);
        },
      }
    );

    console.log("Upload completed:", response.data);
    if (response.data.sucess) {
      userStore.refreshUser();
      setTimeout(() => {
        currentImage.value = `${config.BASE_URL}${user.value.picture[1]}`;
      }, 100);
    }
    return response.data;
  } catch (error) {
    console.error("Erro no upload: ", error.message);
  }
};
</script>

<template>
  <div class="viewImageProfile">
    <button
      class="btn btn-close"
      @click="ActionImageProfileLayoutStore.fnViewImageToggle"
    >
      <i class="bx bx-x"></i>
    </button>

    <button class="btn btn-filter" @click="applyFilter">
      <i class="bx bx-filter-alt"></i>
    </button>

    <button class="btn btn-rotate-left" @click="rotateLeft">
      <i class='bx bx-rotate-left' ></i>
    </button>

    <button class="btn btn-rotate-right" @click="rotateRight">
      <i class='bx bx-rotate-right' ></i>
    </button>

    <button class="btn btn-flip" @click="flipImage">
      <i class='bx bx-reflect-vertical' ></i>
    </button>

    <label class="btn btn-file" for="picture">
      <i class="bx bxs-file-image"></i>
      <input
        type="file"
        id="picture"
        @change="changeImage"
        accept="image/*"
        name="picture"
        hidden
      />
    </label>

    <button class="btn btn-up" @click="sendImage">
      <i class="bx bx-upload"></i>
    </button>

    <div class="wrapperImage">
      <img width="300" height="300" :src="currentImage" alt="imagem profile" />
    </div>

    <div class="upload-file"></div>
  </div>
</template>

<style scoped>
.viewImageProfile {
  position: absolute;
  top: 60px;
  left: 0;
  min-width: 100vw;
  min-height: calc(100vh - 120px);
  max-height: calc(100vh - 120px);
  background-color: var(--dark2);
  box-shadow: inset 0 0 13px var(--dark);
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background-color: rgba(26, 26, 26, 0.5);
}

.btn-filter {
  position: absolute;
  top: 24px;
  left: 24px;
  background-color: rgba(26, 26, 26, 0.5);
}

.btn-rotate-left {
  position: absolute;
  top: 50%;
  left: 44px;
  z-index: 5;
  transform: translateY(-50%);
  background-color: rgba(26, 26, 26, 0.5);
}
.btn-rotate-right {
  position: absolute;
  top: 50%;
  right: 44px;
  z-index: 5;
  transform: translateY(-50%);
  background-color: rgba(26, 26, 26, 0.5);
}

.btn-flip {
  position: absolute;
  bottom: 80px;
  right: 50%;
  z-index: 5;
  transform: translateX(50%);
  background-color: rgba(26, 26, 26, 0.5);
}

.btn-file {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background-color: rgba(26, 26, 26, 0.5);
}

.btn-up {
  position: absolute;
  bottom: 24px;
  right: 24px;
  background-color: rgba(26, 26, 26, 0.5);
}

.wrapperImage {
  position: relative;
  min-width: 300px;
  max-width: 300px;
  min-height: 300px;
  max-height: 300px;

  border-radius: 50%;
  overflow: hidden;
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

.wrapperImage::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 1;

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

.wrapperImage img {
  width: 285px;
  height: 285px;
  border-radius: 50%;

  border: solid 4px var(--dark2);

  object-fit: cover;
  z-index: 1;
}
</style>
