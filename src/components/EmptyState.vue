<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: 'categorias'
  }
})
</script>

<template>
  <div class="flex flex-col p-3 text-center mt-24">
    <h2 class="text-xl font-semibold mb-3 leading-6">Ainda não existem {{ props.name }} criadas</h2>
    <p class="text-base text-greyscale-dark-grey leading-5">
      Digite no campo acima as {{ props.name }} que deseja criar
    </p>
  </div>
</template>
