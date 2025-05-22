<template>
  <div class="loading-overlay fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center text-white text-4xl font-mono select-none z-50">
    <div class="percentage">{{ percent }}%</div>
    <div class="loading-text mt-4 text-lg">Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const percent = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    if (percent.value < 100) {
      percent.value++
    } else {
      clearInterval(interval)
    }
  }, 30) // tiap 30ms naik 1%
})
</script>

<style scoped>
.loading-overlay {
  backdrop-filter: blur(3px);
}

.percentage {
  letter-spacing: 0.1em;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}
</style>
