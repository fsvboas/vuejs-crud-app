<script setup lang="ts">
import { LucideArrowLeft } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const props = defineProps({
  title: {
    type: String,
    default: 'Categorias'
  },
  hasGoBackButton: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    class="flex flex-row w-full h-16 bg-white items-center p-4 border-b-[0.5px] border-[#F3F3F5]"
  >
    <RouterLink
      to="/"
      class="fixed flex w-8 h-8 items-center justify-center"
      v-if="props.hasGoBackButton"
    >
      <LucideArrowLeft class="text-brand-pure-pink h-4 w-4" />
    </RouterLink>

    <h2 class="text-lg text-[#29354F] text-center font-medium w-full">
      {{ props.title }}
    </h2>
  </div>
</template>
