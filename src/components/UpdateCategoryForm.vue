<script setup lang="ts">
import { queryClient } from '@/libs/tanstack-query/query-client'
import { patchCategory } from '@/services/patch-category'
import type { CategoryType } from '@/types/category-type'
import { useMutation } from '@tanstack/vue-query'
import { NForm, NFormItem } from 'naive-ui'
import InputCard from './core/InputCard.vue'

const props = defineProps<{
  category: CategoryType
}>()

const { mutate: update, isPending: pendingPatchCategory } = useMutation({
  mutationFn: patchCategory,
  onSuccess: () => {
    // TO-DO: TOAST NOTIFICATION
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  },
  onError: () => {
    // TO-DO: TOAST NOTIFICATION
  }
})

const handleSubmitForm = (categoryName: CategoryType['name']) => {
  const payload = {
    id: props.category.id,
    name: categoryName
  } as CategoryType
  update({ category: payload })
}
</script>

<template>
  <n-form :show-label="false">
    <n-form-item class="w-full" :show-feedback="false" path="update-category">
      <InputCard
        :category="props.category"
        @submitForm="handleSubmitForm"
        :pendingPatchCategory="pendingPatchCategory"
      />
    </n-form-item>
  </n-form>
</template>
