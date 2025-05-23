<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const songs = [
  {
    id: 1,
    title: 'Rewrite The Stars',
    artist: 'James Arthur',
    url: '/music/Anne-Marie & James Arthur - Rewrite The Stars [from The Greatest Showman_ Reimagined] [pRfmrE0ToTo].mp3',
    cover: '/image/jamesa.jpg',
  },
  {
    id: 2,
    title: 'Night Changes',
    artist: 'One Direction',
    url: '/music/One Direction - Night Changes [syFZfO_wfMQ].mp3',
    cover: '/image/night.jpg',
  },
  {
    id: 3,
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    url: '/music/Christina Perri - A Thousand Years [Official Music Video] [rtOvBOTyX00].mp3',
    cover: '/image/cristianna.png',
  },
  {
    id: 4,
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    url: '/music/Stephen Sanchez - Until I Found You (Official Video) [GxldQ9eX2wo].mp3',
    cover: '/image/until.jpg',
  },
  {
    id: 5,
    title: 'End Of Beginning',
    artist: 'Djo',
    url: '/music/Djo - End Of Beginning (Lyrics) [B3Z4XGAxJB0].mp3',
    cover: '/image/end.jpg ',
  },
  {
    id: 6,
    title: 'Photograph',
    artist: 'Ed Sheeran',
    url: '/music/Ed Sheeran - Photograph (Lyrics) [HpphFd_mzXE].mp3',
    cover: '/image/photo.jpg',
  },
]

const currentSong = ref(null)
const audio = ref(null)
const currentTime = ref(0)
const duration = ref(0)

function playSong(song) {
  if (currentSong.value?.id === song.id) {
    if (audio.value.paused) {
      audio.value.play()
    } else {
      audio.value.pause()
    }
  } else {
    currentSong.value = song
    if (audio.value) {
      audio.value.pause()
    }
    setTimeout(() => {
      audio.value.src = song.url
      audio.value.play()
    }, 0)
  }
}

function updateTime() {
  if (audio.value) {
    currentTime.value = audio.value.currentTime
    duration.value = audio.value.duration
  }
}

function handleEnded() {
  if (currentSong.value) {
    const currentIndex = songs.findIndex(s => s.id === currentSong.value.id)
    const nextIndex = (currentIndex + 1) % songs.length
    playSong(songs[nextIndex])
  }
}

function goBack() {
  router.push('/')
}

onMounted(() => {
  if (audio.value) {
    audio.value.addEventListener('ended', handleEnded)
  }
})
</script>

<template>
  <div class="playlist-container relative min-h-screen bg-black overflow-hidden text-white">
    <button
      @click="goBack"
      class="fixed top-4 left-4 z-20 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-200 transition-colors duration-300 ease-in-out select-none"
    >
      ← Back to Home
    </button>

    <div class="meteors">
      <div class="meteor" style="--delay: 0s; --left: 10%; --duration: 2.5s;"></div>
      <div class="meteor" style="--delay: 1s; --left: 30%; --duration: 3s;"></div>
      <div class="meteor" style="--delay: 1.7s; --left: 50%; --duration: 2s;"></div>
      <div class="meteor" style="--delay: 2.3s; --left: 70%; --duration: 3.5s;"></div>
      <div class="meteor" style="--delay: 3s; --left: 85%; --duration: 2.8s;"></div>
    </div>

    <main class="p-6 max-w-5xl mx-auto relative z-10">
      <h2 class="text-3xl font-bold mb-6">My Music Playlist</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="song in songs"
          :key="song.id"
          class="cursor-pointer bg-white text-black shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-transform duration-200 hover:scale-105 relative"
          @click="playSong(song)"
        >
          <img :src="song.cover" alt="cover" class="w-full h-40 object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-semibold">{{ song.title }}</h3>
            <p class="text-sm text-gray-700">{{ song.artist }}</p>

            <div v-if="currentSong?.id === song.id" class="mt-2 w-full bg-gray-300 rounded h-2 overflow-hidden">
              <div
                class="h-2 bg-blue-500 transition-all duration-200"
                :style="{ width: ((currentTime / duration) * 100 || 0) + '%' }"
              ></div>
            </div>
          </div>

          <div
            v-if="currentSong?.id !== song.id"
            class="absolute inset-0 flex items-center justify-center"
          >
            <span class="text-white text-sm font-bold blink-animation z-10">
              Click to Play
            </span>
          </div>
        </div>
      </div>

      <audio ref="audio" @timeupdate="updateTime" class="hidden" />
    </main>
  </div>
</template>

<style scoped>
.meteors {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.meteor {
  position: absolute;
  top: -50px;
  width: 2px;
  height: 80px;
  background: linear-gradient(45deg, white, transparent);
  filter: drop-shadow(0 0 6px white);
  left: var(--left);
  animation: fall linear infinite;
  animation-delay: var(--delay);
  animation-duration: var(--duration);
  transform: rotate(45deg);
  opacity: 0.8;
  border-radius: 50%;
}

@keyframes fall {
  0% {
    top: -80px;
    opacity: 0.8;
    transform: translateX(0) translateY(0) rotate(45deg);
  }
  100% {
    top: 110vh;
    opacity: 0;
    transform: translateX(100px) translateY(100vh) rotate(45deg);
  }
}

@keyframes blink {
  0%, 95%, 100% { opacity: 1; }
  96%, 98% { opacity: 0; }
}

.blink-animation {
  animation: blink 5s infinite;
}
</style>
