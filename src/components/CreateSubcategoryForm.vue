<script setup lang="ts">
import { useToast } from '@/hooks/use-vue-toast'
import { queryClient } from '@/libs/tanstack-query/query-client'
import { postCategory } from '@/services/post-category'
import type { CategoryType } from '@/types/category-type'
import { useMutation } from '@tanstack/vue-query'
import { NForm, NFormItem } from 'naive-ui'
import { ref } from 'vue'
import AddCategoryInputCard from './AddCategoryInputCard.vue'

const props = defineProps<{
  parentId: CategoryType['id']
}>()

const { showSuccess, showError } = useToast()

const isInputActive = ref<boolean>(false)
const inputReadOnlyMode = ref<boolean>(false)

const { mutate: create, isPending: pendingCreateSubcategory } = useMutation({
  mutationFn: postCategory,
  onSuccess: () => {
    showSuccess({ message: 'Categoria criada com sucesso!', position: 'top' })
    queryClient.invalidateQueries({ queryKey: ['subcategories'] })
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    isInputActive.value = false
  },
  onError: (error) => {
    showError({ message: error.message, position: 'top' })
  }
})

const handleSubmitForm = (categoryName: CategoryType['name']) => {
  inputReadOnlyMode.value = true
  create({
    name: categoryName,
    parent: {
      id: props.parentId
    }
  })
}

const handleInputActiveState = (newValue: boolean) => {
  inputReadOnlyMode.value = false
  isInputActive.value = newValue
}
</script>

<template>
  <n-form class="flex w-full h-11 space-x-2" :show-label="false">
    <!-- TO-DO: change the input border color -->
    <n-form-item class="w-full" :show-feedback="false" path="create-subcategory">
      <AddCategoryInputCard
        @submitForm="handleSubmitForm"
        :pendingCreateCategory="pendingCreateSubcategory"
        :isInputActive="isInputActive"
        @updateInputActiveState="handleInputActiveState"
        :inputReadOnlyState="inputReadOnlyMode"
      />
    </n-form-item>
  </n-form>
</template>
