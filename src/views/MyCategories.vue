<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer.vue'
import CreateCategoryForm from '@/components/CreateCategoryForm.vue'
import EmptyState from '@/components/EmptyState.vue'
import InputCard from '@/components/core/InputCard.vue'
import { getCategories } from '@/services/get-categories'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const { data, isLoading } = useQuery({
  queryKey: ['categories'],
  queryFn: getCategories
})

const categories = computed(() => data.value || [])
</script>

<template>
  <ContentContainer>
    <CreateCategoryForm />
    <div class="flex w-full justify-center my-4">
      <div class="w-full space-y-3" v-if="categories.length">
        <InputCard :category="category" v-for="category in categories" v-bind:key="category.id" />
      </div>
      <!-- TO-DO: PENDING (SKELETON PLACEHOLDER) -->
      <div v-else-if="isLoading === true">CARREGANDO</div>
      <div v-else><EmptyState /></div>
    </div>
  </ContentContainer>
</template>
