<script setup lang="ts">
import ContentContainer from '@/components/core/ContentContainer.vue'
import CreateCategoryForm from '@/components/CreateCategoryForm.vue'
import EmptyState from '@/components/EmptyState.vue'
import UpdateCategoryForm from '@/components/UpdateCategoryForm.vue'
import InputCardSkeletonPlaceholder from '@/components/skeletons/InputCardSkeletonPlaceholder.vue'
import { getCategories } from '@/services/get-categories'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const { data, isLoading } = useQuery({
  queryKey: ['categories'],
  queryFn: () => getCategories({})
})

const categories = computed(() => data.value || [])
</script>

<template>
  <ContentContainer>
    <CreateCategoryForm />
    <div class="flex w-full justify-center my-4">
      <div class="w-full space-y-3" v-if="categories.length && !isLoading">
        <UpdateCategoryForm
          v-for="category in categories"
          v-bind:key="category.id"
          :category="category"
        />
      </div>
      <div class="w-full space-y-3" v-else-if="isLoading">
        <InputCardSkeletonPlaceholder />
      </div>
      <div v-else><EmptyState /></div>
    </div>
  </ContentContainer>
</template>
