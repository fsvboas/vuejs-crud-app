<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  title: string
  quantity: number
  link: string
}>()
</script>

<template>
  <RouterLink
    :to="props.link"
    class="w-full flex items-center justify-between rounded-2xl py-4 pl-5 pr-3 h-14 border border-greyscale-light-grey hover:bg-greyscale-light-grey/30 duration-300"
  >
    <div class="flex flex-row items-center space-x-4">
      <span class="text-base font-medium text-[#29354F]">{{ props.title }}</span>
      <div
        v-show="quantity > 0"
        class="flex items-center justify-center bg-greyscale-light-grey rounded-2xl h-7 w-10 py-3 px-4"
      >
        <span class="text-greyscale-pure-grey font-medium text-base">{{ props.quantity }}</span>
      </div>
    </div>
    <ChevronRight class="text-greyscale-dark-grey" :size="18" />
  </RouterLink>
</template>
