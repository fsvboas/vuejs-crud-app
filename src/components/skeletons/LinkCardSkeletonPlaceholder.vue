<script setup lang="ts">
import { NSkeleton } from 'naive-ui'

const fakeLoadingLinkCards = Array.from({ length: 2 }, (_, index) => index)
</script>

<template>
  <n-skeleton
    v-for="index in fakeLoadingLinkCards"
    :key="index"
    height="52px"
    width="100%"
    class="rounded-[14px]"
  />
</template>
