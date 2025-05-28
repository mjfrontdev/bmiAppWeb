<template>
  <div class="min-h-screen bg-gradient-to-b from-dark to-dark-lighter p-4">
    <div class="max-w-md mx-auto">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Select Gender</h2>
      
      <div class="flex justify-center gap-8 mb-12">
        <button 
          @click="selectGender('male')"
          :class="[
            'w-20 h-20 rounded-full flex items-center justify-center text-4xl transition-all duration-300',
            gender === 'male' 
              ? 'bg-primary text-white shadow-lg' 
              : 'bg-dark-lighter text-gray-400 hover:bg-gray-700'
          ]"
        >
          ♂
        </button>
        
        <button 
          @click="selectGender('female')"
          :class="[
            'w-20 h-20 rounded-full flex items-center justify-center text-4xl transition-all duration-300',
            gender === 'female' 
              ? 'bg-primary text-white shadow-lg' 
              : 'bg-dark-lighter text-gray-400 hover:bg-gray-700'
          ]"
        >
          ♀
        </button>
      </div>

      <h2 class="text-3xl font-bold text-white mb-4 text-center">Enter Age</h2>
      <div class="bg-dark-lighter rounded-xl p-4 mb-8">
        <input 
          type="text" 
          v-model="age"
          readonly
          class="w-full bg-transparent text-4xl text-white text-center outline-none"
          placeholder="0"
        />
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
          @click="clearAge"
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
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GenderAge',
  setup() {
    const router = useRouter()
    const gender = ref<'male' | 'female' | null>(null)
    const age = ref('')

    const isValid = computed(() => {
      return gender.value && age.value && parseInt(age.value) > 0
    })

    const selectGender = (g: 'male' | 'female') => {
      gender.value = g
    }

    const appendNumber = (n: number) => {
      if (age.value.length < 2) {
        age.value += n.toString()
      }
    }

    const clearAge = () => {
      age.value = ''
    }

    const nextPage = () => {
      if (isValid.value) {
        // Store data in localStorage or state management
        localStorage.setItem('gender', gender.value!)
        localStorage.setItem('age', age.value)
        router.push('/weight-height')
      }
    }

    return {
      gender,
      age,
      isValid,
      selectGender,
      appendNumber,
      clearAge,
      nextPage
    }
  }
})
</script> 