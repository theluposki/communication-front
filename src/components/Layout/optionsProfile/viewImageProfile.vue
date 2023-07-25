<script setup>
import { onMounted, onUnmounted } from "vue";
import { useActionImageProfileLayoutStore } from "../../../stores/actionImageProfileLayout.js";

const ActionImageProfileLayoutStore = useActionImageProfileLayoutStore();

onMounted(() => {
  startCamera();
});

onUnmounted(() => {
  stopCamera();
  console.log("stop cam");
});

let videoTrack;
let currentCamera = "user";

function stopCamera() {
  if (videoTrack) {
    videoTrack.stop();
  }
}

async function startCamera() {
  const cameraCanvas = document.getElementById("cameraCanvas");
  const ctx = cameraCanvas.getContext("2d");
  try {
    const constraints = {
      video: {
        width: 1920,
        height: 1080,
        aspectRatio: 9/16,
        videoCodec: "h264",
        facingMode: currentCamera,
      },
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoTrack = stream.getVideoTracks()[0];
    const video = document.createElement("video");

    video.srcObject = new MediaStream([videoTrack]);
    video.autoplay = true;

    video.addEventListener("loadedmetadata", () => {
      cameraCanvas.width = video.videoWidth;
      cameraCanvas.height = video.videoHeight;
    });

    function drawFrame() {
      ctx.clearRect(0, 0, cameraCanvas.width, cameraCanvas.height);

      if (currentCamera === "user") {
        ctx.save();
        ctx.scale(-1, 1); // Inverte horizontalmente
        ctx.imageSmoothingEnabled = false;
        ctx.imageSmoothingQuality = "high";
        ctx.translate(-cameraCanvas.width, 0);
      }

      ctx.drawImage(video, 0, 0, cameraCanvas.width, cameraCanvas.height);

      if (currentCamera === "user") {
        ctx.restore();
      }

      // Aplique um filtro de brilho.
      ctx.filter = "brightness(1.2)";

      // Aplique um filtro de contraste.
      ctx.filter = "contrast(1.1)";

      requestAnimationFrame(drawFrame);
    }

    video.addEventListener("play", () => {
      requestAnimationFrame(drawFrame);
    });
  } catch (error) {
    console.error("Erro ao acessar a câmera:", error);
  }
}

async function switchCamera() {
  currentCamera = currentCamera === "user" ? "environment" : "user";
  stopCamera();
  startCamera();
}
</script>

<template>
  <div class="viewImageProfile">
    <canvas id="cameraCanvas"></canvas>

    <button
      class="btn btn-close"
      @click="ActionImageProfileLayoutStore.fnViewImageToggle"
    >
      <i class="bx bx-x"></i>
    </button>

    <button class="btn btn-photo">
      <i class="bx bx-camera"></i>
    </button>

    <button class="btn btn-file">
      <i class="bx bxs-file-png"></i>
    </button>

    <button class="btn btn-rotate" @click="switchCamera">
        <i class='bx bx-transfer-alt'></i>
    </button>

    <div class="confirmOrTrash">        
        <button class="btn btn-check">
            <i class='bx bx-check'></i>
        </button>
        <button class="btn btn-trash">
            <i class='bx bx-trash-alt' ></i>
        </button>
    </div>
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

#cameraCanvas {
  background-color: rgba(33, 33, 33, 0.4);
  width: 100%;
  max-width: 1048px;
  margin: 0 auto;
  aspect-ratio: 9/16;
  overflow: hidden;
  min-height: calc(100vh - 120px);
  max-height: calc(100vh - 120px);
}

.btn-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background-color: rgba(26, 26, 26, 0.5);
}

.btn-photo {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(26, 26, 26, 0.5);
}

.confirmOrTrash {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(26, 26, 26, 0.5);

  display: flex;
  gap: 60px;
}

.btn-check, .btn-trash {
  background-color: rgba(26, 26, 26, 0.5);
}

.btn-file {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background-color: rgba(26, 26, 26, 0.5);
}

.btn-rotate {
  position: absolute;
  top: 24px;
  left: 24px;
  background-color: rgba(26, 26, 26, 0.5);
}
</style>
