<script lang="ts" setup>
import Peer, { MediaConnection } from 'skyway-js';

let localStream: MediaStream;
let peerId = ref<string>();
let partnerPeerId = ref<string>('');
let myVideoElement = ref<HTMLVideoElement>();
let partnerVideoElement = ref<HTMLVideoElement>();
const runtimeConfig = useRuntimeConfig();
const peer = new Peer({
  key: runtimeConfig.public.skywayApiKey,
  // TODO: 本番環境じゃなければdebugを有効するように修正必須
  debug: 3
});

const getMedia = () => {
  if (process.client) {
    if (!navigator.mediaDevices) {
      // TODO: エラーハンドリングを検討
      console.error('getUserMedia() not supported.');
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (myVideoElement.value) {
          myVideoElement.value.srcObject = stream;
          myVideoElement.value.play();
          localStream = stream;
        }
      })
      .catch((error) => {
        // TODO: エラーハンドリングを検討
        console.error('mediaDevice.getUserMedia() error:', error);
        return;
      });
  }
};

const handleStartVideoCall = () => {
  try {
    const mediaConnection = peer.call(partnerPeerId.value, localStream);
    setEventListener(mediaConnection);
  } catch (error) {
    console.error(error);
    return;
  }
};

const handleEndVideoCall = () => {
  // TODO: 実装必須
  const mediaConnection = peer.destroy();
};

const setEventListener = (mediaConnection: MediaConnection) => {
  mediaConnection.on('stream', (stream: MediaStream) => {
    if (partnerVideoElement.value) {
      partnerVideoElement.value.srcObject = stream;
      partnerVideoElement.value.play();
    }
  });
  mediaConnection.on('close', (stream: MediaStream) => {
    // TODO: 実装必須
  });
};
getMedia();
peer.on('open', () => {
  peerId.value = peer.id;
});
peer.on('call', (mediaConnection) => {
  mediaConnection.answer(localStream);
  setEventListener(mediaConnection);
});
onUnmounted(() => {
  // unmountedとなったら発信を停止
  localStream.getTracks().forEach(function (track) {
    track.stop();
  });
});
</script>
<template>
  <div class="">
    <h3>My ID</h3>
    <p>{{ peerId }}</p>
    <hr />
    <h3>Their ID</h3>
    <hr />
    <input v-model="partnerPeerId" placeholder="相手のID" type="text" />
    <div>
      <button @click="handleStartVideoCall">発信！</button>
    </div>
    <div>
      <button @click="handleEndVideoCall">終了！</button>
    </div>
  </div>
  <div class="videoArea">
    <video
      class="myVideo"
      ref="myVideoElement"
      id="my-video"
      autoplay
      muted
      playsinline
    ></video>
    <video
      class="peerVideo"
      ref="partnerVideoElement"
      id="peer-video"
      autoplay
      muted
      playsinline
    ></video>
  </div>
</template>
<style scoped lang="scss">
.videoArea {
  margin-top: 20px;
}

.myVideo {
  border: 1px solid red;
}
.peerVideo {
  border: 1px solid blue;
}

.myVideo,
.peerVideo {
  display: inline-block;
  box-sizing: border-box;
  width: 50%;
}
</style>
