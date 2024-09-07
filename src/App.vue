<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from './components/AppHeader.vue'

const route = useRoute()

console.log(route.name)

const headerTitle = computed(() =>
  route.name === 'home' || route.name === 'my-categories'
    ? 'Categorias'
    : route.name === 'my-subcategories'
      ? 'Subcategorias'
      : undefined
)

const headerHasGoBackButton = computed(() => (route.name === 'home' ? false : true))
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white text-dark-blue font-medium">
    <AppHeader :title="headerTitle" :has-go-back-button="headerHasGoBackButton" />
    <RouterView />
  </div>
</template>
