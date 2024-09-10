<script setup lang="ts">
import type { CategoryType } from '@/types/category-type'
import { ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps<{
  title: CategoryType['name']
}>()

const isAccordionOpen = ref(false)
const handleToggleAccordionOpen = () => {
  isAccordionOpen.value = !isAccordionOpen.value
}
</script>

<template>
  <div class="border border-greyscale-light-grey rounded-2xl">
    <div
      class="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-greyscale-light-grey transition-colors duration-500"
      @click="handleToggleAccordionOpen"
    >
      <h2 class="text-base font-semibold">{{ props.title }}</h2>
      <ChevronDown
        color="#DA3468"
        :size="24"
        :class="`transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : 'rotate-0'}`"
      />
    </div>
    <div v-show="isAccordionOpen" class="p-4 space-y-3">
      <slot></slot>
    </div>
  </div>
</template>
