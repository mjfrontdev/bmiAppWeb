<template>
  <div class="min-h-screen bg-gradient-to-b from-dark to-dark-lighter flex flex-col items-center justify-center p-4">
    <h1 class="text-4xl font-bold text-white mb-8 animate-fade-in">BMI Calculator</h1>
    
    <div class="w-32 h-32 mb-12 animate-bounce">
      <svg class="w-full h-full text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
      </svg>
    </div>

    <router-link 
      to="/gender-age"
      class="px-8 py-4 bg-primary text-white rounded-full text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse"
    >
      START
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StartPage'
})
</script> 