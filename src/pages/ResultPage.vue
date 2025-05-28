<template>
  <div class="min-h-screen bg-gradient-to-b from-dark to-dark-lighter p-4">
    <div class="max-w-md mx-auto">
      <h2 class="text-3xl font-bold text-white mb-8 text-center">Your BMI Result</h2>
      
      <div class="bg-dark-lighter rounded-xl p-8 mb-8 text-center">
        <div class="text-6xl font-bold text-primary mb-4 animate-fade-in">
          {{ bmi }}
        </div>
        <div class="text-2xl text-white mb-2">{{ status }}</div>
        <div class="text-gray-400">{{ description }}</div>
      </div>

      <div class="mb-12">
        <div class="flex justify-between text-sm text-gray-400 mb-2">
          <span>Underweight</span>
          <span>Normal</span>
          <span>Overweight</span>
          <span>Obese</span>
        </div>
        <div class="relative h-4 bg-dark-lighter rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500"
            style="width: 100%;"
          ></div>
          <div 
            class="absolute top-0 h-full w-1.5 bg-white rounded"
            :style="{ left: `calc(${bmiPosition}% - 3px)` }"
          ></div>
        </div>
      </div>

      <div class="space-y-4">
        <button 
          @click="restart"
          class="w-full py-4 bg-primary text-white rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Calculate Again
        </button>
        
        <button 
          @click="share"
          class="w-full py-4 bg-dark-lighter text-white rounded-full text-xl font-bold hover:bg-gray-700 transition-colors"
        >
          Share Result
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ResultPage',
  setup() {
    const router = useRouter()
    const bmi = ref('0')
    const status = ref('')
    const description = ref('')

    const bmiPosition = computed(() => {
      const bmiNum = parseFloat(bmi.value)
      if (bmiNum < 18.5) return (bmiNum / 18.5) * 25
      if (bmiNum < 25) return 25 + ((bmiNum - 18.5) / 6.5) * 25
      if (bmiNum < 30) return 50 + ((bmiNum - 25) / 5) * 25
      return 75 + Math.min(((bmiNum - 30) / 10) * 25, 25)
    })

    const getStatus = (bmiNum: number) => {
      if (bmiNum < 18.5) {
        return {
          status: 'Underweight',
          description: 'You may need to gain some weight'
        }
      }
      if (bmiNum < 25) {
        return {
          status: 'Normal',
          description: 'You have a healthy weight'
        }
      }
      if (bmiNum < 30) {
        return {
          status: 'Overweight',
          description: 'You may need to lose some weight'
        }
      }
      return {
        status: 'Obese',
        description: 'You should consult a healthcare provider'
      }
    }

    onMounted(() => {
      const storedBmi = localStorage.getItem('bmi')
      if (storedBmi) {
        bmi.value = storedBmi
        const { status: statusText, description: descText } = getStatus(parseFloat(storedBmi))
        status.value = statusText
        description.value = descText
      } else {
        router.push('/')
      }
    })

    const restart = () => {
      localStorage.clear()
      router.push('/')
    }

    const share = () => {
      if (navigator.share) {
        navigator.share({
          title: 'My BMI Result',
          text: `My BMI is ${bmi.value} (${status.value})`,
        })
      }
    }

    return {
      bmi,
      status,
      description,
      bmiPosition,
      restart,
      share
    }
  }
})
</script> 