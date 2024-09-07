<script setup lang="ts">
import { getCategories } from '@/services/get-categories'
import { useQuery } from '@tanstack/vue-query'
import { PersonStanding } from 'lucide-vue-next'
import { NButton } from 'naive-ui'

const { data } = useQuery({
  queryKey: ['categories'],
  queryFn: () => getCategories()
})

const categories = data.value || []
</script>

<template>
  <main>
    <div class="flex items-center justify-center min-h-screen space-x-2">
      <h1 class="text-green-500 font-medium text-2xl">Hello World</h1>
      <PersonStanding :size="32" class="text-green-500" />
      <n-button>Naive UI Button</n-button>
      <ul>
        <li v-for="category in categories" :key="category.id">{{ category.name }}</li>
      </ul>
    </div>
  </main>
</template>
