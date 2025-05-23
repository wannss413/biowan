<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Loading from '../components/loading.vue'

const router = useRouter()

const buttonku = [
  { nama: 'WhatsApp', link: 'https://wa.me/6282271287753?text=Oiiii,%20boleh%20kita%20berteman%20broooo%20ku' },
  { nama: 'Instagram', link: 'https://www.instagram.com/marwansardo?igsh=cWtnbzFiY2p6Nmxy_' },
  { nama: 'Git Hub', link: 'https://github.com/wannss413' },
  { nama: 'My Music Playlist', link: '/playlist', isRoute: true }
]

const techStack = ['Vue.js', 'Laravel', 'TailwindCSS']

// Animasi teks berjalan
const titles = ['Informatics Engineering Student', 'Tech Enthusiast', 'FrontEnd Web Developer', 'BackEnd Web Developer']
const currentTitle = ref('')
let index = 0
let charIndex = 0
let deleting = false

// Meteor data
const meteors = ref(Array(8).fill().map((_, i) => ({ id: i }))) // Create 8 meteors for subtle effect

const isLoading = ref(false)

function handleClick(item) {
  if (item.isRoute) {
    isLoading.value = true
    setTimeout(() => {
      router.push(item.link)
      isLoading.value = false
    }, 1500)
  } else {
    window.open(item.link, '_blank')
  }
}

onMounted(() => {
  setInterval(() => {
    const fullText = titles[index]

    if (!deleting) {
      currentTitle.value = fullText.substring(0, charIndex++)
      if (charIndex > fullText.length + 5) deleting = true
    } else {
      currentTitle.value = fullText.substring(0, charIndex--)
      if (charIndex === 0) {
        deleting = false
        index = (index + 1) % titles.length
      }
    }
  }, 120)
})
</script>

<template>
  <main class="relative flex flex-col justify-center items-center md:items-start h-screen px-4 md:px-56 bg-gray-50 overflow-hidden">
    <!-- Meteor Elements -->
    <div
      v-for="meteor in meteors"
      :key="meteor.id"
      class="meteor"
      :style="{
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${1.5 + Math.random() * 1.5}s`
      }"
    ></div>

    <!-- Original Content -->
    <h1 class="text-4xl md:text-6xl font-semibold z-10">
      Hello, I'm <span class="font-bold text-6xl fade-in-right"><br>Marwan S</span>
    </h1>
    <p class="text-lg mt-4 z-10">
      I'm a
      <span class="bg-slate-700 px-2 text-white inline-block">
        {{ currentTitle }}<span class="animate-pulse">|</span>
      </span>
    </p>

    <!-- Button List -->
    <div class="mt-8 flex flex-wrap justify-start px-4 md:px-0 gap-4 z-10">
      <button
        v-for="item in buttonku"
        :key="item.nama"
        @click="handleClick(item)"
        :disabled="isLoading"
        class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ item.nama }}
      </button>
    </div>

    <!-- Tech Stack List -->
    <div class="mt-5 flex flex-wrap justify-center gap-4 text-lg z-10">
      <p v-for="stack in techStack" :key="stack" class="fade-in-right">• {{ stack }}</p>
    </div>

    <!-- Loading Overlay -->
    <Loading v-if="isLoading" />
  </main>
</template>

<style scoped>
/* Meteor Styles */
.meteor {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #333;
  border-radius: 50%;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.5);
  opacity: 0.6;
  animation: meteor-fall linear infinite;
  pointer-events: none;
}

@keyframes meteor-fall {
  0% {
    transform: translate(0, 0);
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translate(-150px, 150px);
    opacity: 0;
  }
}

a:hover {
  transform: scale(1.05);
}

main {
  position: relative;
  z-index: 1;
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
}

.fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
}
</style>
