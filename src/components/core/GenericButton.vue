<script setup lang="ts">
import { buttonProps, NButton } from 'naive-ui'

const props = defineProps({
  ...buttonProps
})
</script>

<template>
  <n-button v-bind="props" strong :focusable="false" class="duration-500">
    <slot />
  </n-button>
</template>
