<script setup lang="ts">
import { useToast } from '@/hooks/use-vue-toast'
import { queryClient } from '@/libs/tanstack-query/query-client'
import { postCategory } from '@/services/post-category'
import type { CategoryFormType } from '@/types/category-form-type'
import { useMutation } from '@tanstack/vue-query'
import { NForm, NFormItem, NInput } from 'naive-ui'
import { ref } from 'vue'
import GenericButton from './core/GenericButton.vue'

const { showSuccess, showError } = useToast()

const { mutate: create, isPending: pendingCreateCategory } = useMutation({
  mutationFn: postCategory,
  onSuccess: () => {
    showSuccess({ message: 'Categoria criada com sucesso!', position: 'top' })
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    formModel.value.name = ''
  },
  onError: (error) => {
    showError({ message: error.message, position: 'top' })
  }
})

const formModel = ref<CategoryFormType>({
  name: ''
})

const handleSubmitForm = () => {
  create(formModel.value)
}
</script>

<template>
  <n-form class="flex w-full h-11 space-x-2" :show-label="false">
    <!-- TO-DO: change the input border color -->
    <n-form-item class="w-full" :show-feedback="false" path="create-category">
      <n-input
        placeholder="Crie uma categoria"
        round
        maxlength="48"
        class="h-full w-full items-center text-base"
        v-model:value="formModel.name"
      />
    </n-form-item>
    <n-form-item class="h-full min-w-fit" :show-feedback="false">
      <GenericButton
        attr-type="submit"
        round
        :disabled="!formModel.name.trim()"
        color="#DA3468"
        class="w-20 h-full disabled:bg-greyscale-light-grey disabled:text-greyscale-dark-grey"
        @click="handleSubmitForm"
        :loading="pendingCreateCategory"
      >
        Criar
      </GenericButton>
    </n-form-item>
  </n-form>
</template>
