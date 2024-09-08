<script setup lang="ts">
import { queryClient } from '@/libs/tanstack-query/query-client'
import { postCategory } from '@/services/post-category'
import type { CategoryType } from '@/types/category-type'
import { useMutation } from '@tanstack/vue-query'
import { NForm, NFormItem, NInput } from 'naive-ui'
import { ref } from 'vue'
import GenericButton from './core/GenericButton.vue'

const { mutate: create, isPending: pendingCreateUser } = useMutation({
  mutationFn: postCategory,
  onSuccess: () => {
    // TO-DO: TOAST NOTIFICATION
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  },
  onError: () => {
    // TO-DO: TOAST NOTIFICATION
  }
})

const formModel = ref<CategoryType>({
  name: ''
})

const handleSubmitForm = () => {
  create(formModel.value)
}
</script>

<template>
  <n-form class="flex w-full h-11 space-x-2" :show-label="false">
    <!-- TO-DO: change the input border color -->
    <n-form-item class="w-full" :show-feedback="false" path="category">
      <n-input
        placeholder="Crie uma categoria"
        round
        maxlength="48"
        class="h-full w-full items-center text-base"
        v-model:value="formModel.name"
      />
    </n-form-item>
    <n-form-item class="h-full" :show-feedback="false">
      <GenericButton
        attr-type="submit"
        round
        :disabled="!formModel.name.trim()"
        color="#DA3468"
        class="w-20 h-full disabled:bg-greyscale-light-grey disabled:text-greyscale-dark-grey"
        @click="handleSubmitForm"
        :loading="pendingCreateUser"
      >
        Criar
      </GenericButton>
    </n-form-item>
  </n-form>
</template>
