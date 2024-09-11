<script setup lang="ts">
import { useToast } from '@/hooks/use-vue-toast'
import { queryClient } from '@/libs/tanstack-query/query-client'
import { patchCategory } from '@/services/patch-category'
import type { CategoryType } from '@/types/category-type'
import { useMutation } from '@tanstack/vue-query'
import { NForm, NFormItem } from 'naive-ui'
import { ref } from 'vue'
import UpdateCategoryInputCard from './UpdateCategoryInputCard.vue'

const props = defineProps<{
  category: CategoryType
}>()

const { showSuccess, showError } = useToast()

const isEditMode = ref<boolean>(false)
const inputReadOnlyMode = ref<boolean>(false)

const { mutate: update, isPending: pendingPatchCategory } = useMutation({
  mutationFn: patchCategory,
  onSuccess: () => {
    showSuccess({ message: 'Categoria atualizada com sucesso!', position: 'top-right' })
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    isEditMode.value = false
  },
  onError: (error) => {
    showError({ message: error.message, position: 'top-right' })
  }
})

const handleSubmitForm = (categoryName: CategoryType['name']) => {
  inputReadOnlyMode.value = true
  const payload = {
    id: props.category.id,
    name: categoryName
  } as CategoryType
  update({ category: payload })
}

const handleEditModeChange = (newValue: boolean) => {
  inputReadOnlyMode.value = false
  isEditMode.value = newValue
}
</script>

<template>
  <n-form :show-label="false">
    <n-form-item class="w-full" :show-feedback="false" path="update-category">
      <UpdateCategoryInputCard
        :category="props.category"
        @submitForm="handleSubmitForm"
        :pendingPatchCategory="pendingPatchCategory"
        :isEditMode="isEditMode"
        @updateEditMode="handleEditModeChange"
        :inputReadOnlyState="inputReadOnlyMode"
      />
    </n-form-item>
  </n-form>
</template>
