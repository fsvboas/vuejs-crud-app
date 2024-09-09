<script setup lang="ts">
import { queryClient } from '@/libs/tanstack-query/query-client'
import { patchCategory } from '@/services/patch-category'
import type { CategoryFormType } from '@/types/category-form-type'
import type { CategoryType } from '@/types/category-type'
import { useMutation } from '@tanstack/vue-query'
import { NForm, NFormItem } from 'naive-ui'
import { ref } from 'vue'
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

const formModel = ref<CategoryFormType>({
  name: ''
})
</script>

<template>
  <n-form :show-label="false">
    <n-form-item class="w-full" :show-feedback="false" path="update-category">
      <InputCard :categoryId="category.id" :categoryName="category.name" />
    </n-form-item>
  </n-form>
</template>
