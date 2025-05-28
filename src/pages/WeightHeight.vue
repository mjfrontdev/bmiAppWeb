<template>
  <div class="min-h-screen bg-gradient-to-b from-dark to-dark-lighter p-4">
    <div class="max-w-md mx-auto">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Enter Weight & Height</h2>
      
      <div class="space-y-8 mb-12">
        <div>
          <label class="block text-white text-lg mb-2">Weight (kg)</label>
          <div 
            class="bg-dark-lighter rounded-xl p-4 cursor-pointer"
            :class="{ 'ring-2 ring-primary': activeInput === 'weight' }"
            @click="activeInput = 'weight'"
          >
            <input 
              type="text" 
              v-model="weight"
              readonly
              class="w-full bg-transparent text-4xl text-white text-center outline-none"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label class="block text-white text-lg mb-2">Height (cm)</label>
          <div 
            class="bg-dark-lighter rounded-xl p-4 cursor-pointer"
            :class="{ 'ring-2 ring-primary': activeInput === 'height' }"
            @click="activeInput = 'height'"
          >
            <input 
              type="text" 
              v-model="height"
              readonly
              class="w-full bg-transparent text-4xl text-white text-center outline-none"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 mb-8">
        <button 
          v-for="n in 9" 
          :key="n"
          @click="appendNumber(n)"
          class="bg-dark-lighter text-white text-2xl py-4 rounded-xl hover:bg-gray-700 transition-colors"
        >
          {{ n }}
        </button>
        <button 
          @click="appendNumber(0)"
          class="bg-dark-lighter text-white text-2xl py-4 rounded-xl hover:bg-gray-700 transition-colors"
        >
          0
        </button>
        <button 
          @click="clearInput"
          class="bg-dark-lighter text-white text-2xl py-4 rounded-xl hover:bg-gray-700 transition-colors"
        >
          C
        </button>
      </div>

      <button 
        @click="nextPage"
        :disabled="!isValid"
        :class="[
          'w-full py-4 rounded-full text-xl font-bold transition-all duration-300',
          isValid 
            ? 'bg-primary text-white shadow-lg hover:shadow-xl' 
            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
        ]"
      >
        Calculate BMI
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'WeightHeight',
  setup() {
    const router = useRouter()
    const weight = ref('')
    const height = ref('')
    const activeInput = ref<'weight' | 'height'>('weight')

    const isValid = computed(() => {
      const weightNum = parseInt(weight.value)
      const heightNum = parseInt(height.value)
      return weightNum > 0 && heightNum > 0
    })

    const appendNumber = (n: number) => {
      if (activeInput.value === 'weight' && weight.value.length < 3) {
        weight.value += n.toString()
      } else if (activeInput.value === 'height' && height.value.length < 3) {
        height.value += n.toString()
      }
    }

    const clearInput = () => {
      if (activeInput.value === 'weight') {
        weight.value = ''
      } else {
        height.value = ''
      }
    }

    const nextPage = () => {
      if (isValid.value) {
        // Calculate BMI
        const weightNum = parseInt(weight.value)
        const heightNum = parseInt(height.value) / 100 // Convert cm to m
        const bmi = weightNum / (heightNum * heightNum)
        
        // Store data
        localStorage.setItem('weight', weight.value)
        localStorage.setItem('height', height.value)
        localStorage.setItem('bmi', bmi.toFixed(1))
        
        router.push('/result')
      }
    }

    return {
      weight,
      height,
      activeInput,
      isValid,
      appendNumber,
      clearInput,
      nextPage
    }
  }
})
</script> 