<script setup lang="ts">
import { NSkeleton } from 'naive-ui'

const fakeLoadingData = Array.from({ length: 10 }, (_, index) => index)
</script>

<template>
  <n-skeleton
    v-for="index in fakeLoadingData"
    :key="index"
    height="52px"
    width="100%"
    class="rounded-[14px]"
  />
</template>
