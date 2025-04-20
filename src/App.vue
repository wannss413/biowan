<script setup>
import { ref, onMounted } from 'vue'

const buttonku = [
  { nama: 'My Resume', link: '#' },
  { nama: 'LinkedIn', link: 'https://www.linkedin.com/in/alif-fajriadi-434815276/' },
  { nama: 'Git Hub', link: 'https://github.com/aliffajriadi' },
  { nama: 'Instagram', link: 'https://www.instagram.com/alfjrd_' },
  { nama: 'WhatsApp', link: 'https://wa.me/62895603792033?text=Hallo,%20boleh%20kita%20berteman%20broooo%20ku' }
]

const techStack = ['Vue.js', 'Laravel', 'Express.js', 'Flask', 'TailwindCSS', 'Ubuntu']

// Animasi teks berjalan
const titles = ['Informatics Engineering Student', 'Tech Enthusiast', 'FrontEnd Web Developer', 'BackEnd Web Developer']
const currentTitle = ref('')
let index = 0
let charIndex = 0
let deleting = false

// Meteor data
const meteors = ref(Array(8).fill().map((_, i) => ({ id: i }))) // Create 8 meteors for subtle effect

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
  }, 120) // kecepatan animasi
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
        top: `${Math.random() * 100}vh`, // Random vertical start position
        left: `${Math.random() * 100}vw`, // Random horizontal start position
        animationDelay: `${Math.random() * 4}s`, // Random delay for each meteor
        animationDuration: `${1.5 + Math.random() * 1.5}s` // Random duration between 1.5-3s
      }"
    ></div>

    <!-- Original Content -->
    <h1 class="text-4xl md:text-6xl font-semibold z-10">
      Hello, I'm <span class="font-bold text-6xl fade-in-right"><br>Alif Fajriadi</span>
    </h1>
    <p class="text-lg mt-4 z-10">
      I'm a
      <span class="bg-slate-700 px-2 text-white inline-block">
        {{ currentTitle }}<span class="animate-pulse">|</span>
      </span>
    </p>

    <!-- Button List -->
    <div class="mt-8 flex flex-wrap justify-start px-4 md:px-0 gap-4 z-10">
      <a
        v-for="item in buttonku"
        :key="item.nama"
        :href="item.link"
        class="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-transform transform hover:scale-105"
      >
        {{ item.nama }}
      </a>
    </div>

    <!-- Tech Stack List -->
    <div class="mt-5 flex flex-wrap justify-center gap-4 text-lg z-10">
      <p v-for="stack in techStack" :key="index" class="fade-in-right">• {{ stack }}</p>
      
    </div>
  </main>
</template>

<style scoped>
/* Meteor Styles */
.meteor {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #333; /* Dark color for visibility on light background */
  border-radius: 50%;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.5); /* Subtle dark glow */
  opacity: 0.6;
  animation: meteor-fall linear infinite;
  pointer-events: none; /* Prevent interaction with meteors */
}

/* Meteor Animation */
@keyframes meteor-fall {
  0% {
    transform: translate(0, 0);
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: translate(-150px, 150px); /* Move diagonally down-left */
    opacity: 0; /* Fade out */
  }
}

/* Original Hover Styles */
a:hover {
  transform: scale(1.05); /* Slight zoom effect */
}

/* Ensure content is above meteors */
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