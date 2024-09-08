<script setup lang="ts">
import { buttonProps, NButton } from 'naive-ui'

const props = defineProps({
  class: {
    type: String
  },
  ...buttonProps
})
</script>

<template>
  <n-button
    v-bind="props"
    strong
    :focusable="false"
    :class="[props.class, 'duration-500 disabled:opacity-100 flex items-center justify-center p-0']"
  >
    <slot />
  </n-button>
</template>
