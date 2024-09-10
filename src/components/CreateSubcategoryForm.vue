<script setup lang="ts">
import { queryClient } from '@/libs/tanstack-query/query-client'
import { postCategory } from '@/services/post-category'
import type { CategoryType } from '@/types/category-type'
import { useMutation } from '@tanstack/vue-query'
import { NForm, NFormItem } from 'naive-ui'
import AddCategoryInputCard from './AddCategoryInputCard.vue'

const props = defineProps<{
  parentId: CategoryType['id']
}>()

const { mutate: create, isPending: pendingCreateSubcategory } = useMutation({
  mutationFn: postCategory,
  onSuccess: () => {
    // TO-DO: TOAST NOTIFICATION
    queryClient.invalidateQueries({ queryKey: ['subcategories'] })
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  },
  onError: () => {
    // TO-DO: TOAST NOTIFICATION
  }
})

const handleSubmitForm = (categoryName: CategoryType['name']) => {
  create({
    name: categoryName,
    parent: {
      id: props.parentId
    }
  })
}
</script>

<template>
  <n-form class="flex w-full h-11 space-x-2" :show-label="false">
    <!-- TO-DO: change the input border color -->
    <n-form-item class="w-full" :show-feedback="false" path="create-subcategory">
      <AddCategoryInputCard
        @submitForm="handleSubmitForm"
        :pendingCreateCategory="pendingCreateSubcategory"
      />
    </n-form-item>
  </n-form>
</template>
