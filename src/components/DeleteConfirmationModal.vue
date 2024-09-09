<script lang="ts" setup>
import WarningSvg from '@/assets/svg/warning.svg'
import { queryClient } from '@/libs/tanstack-query/query-client'
import { deleteCategory } from '@/services/delete-category'
import type { CategoryType } from '@/types/category-type'
import { useMutation } from '@tanstack/vue-query'
import { NModal } from 'naive-ui'
import { ref, watch } from 'vue'
import GenericButton from './core/GenericButton.vue'

const props = defineProps<{
  showModal: boolean
  categoryId: CategoryType['id']
}>()

const emit = defineEmits<{
  (event: 'update:showModal', value: boolean): void
}>()

const showModal = ref(props.showModal)

watch(
  () => props.showModal,
  (newValue) => {
    showModal.value = newValue
  }
)

const closeModal = () => {
  emit('update:showModal', false)
}

const { mutate: del, isPending: pendingDeleteCategory } = useMutation({
  mutationFn: deleteCategory,
  onSuccess: () => {
    // TO-DO: TOAST NOTIFICATION
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    closeModal()
  },
  onError: () => {
    // TO-DO: TOAST NOTIFICATION
  }
})

const handleDeleteCategory = () => {
  del({ categoryId: props.categoryId })
}
</script>

<template>
  <n-modal v-model:show="showModal" :mask-closable="false">
    <div class="bg-white rounded-3xl p-4 w-full h-fit mx-7 flex flex-col space-y-4">
      <img :src="WarningSvg" alt="warning-icon" class="self-center w-20 h-20" />
      <div class="space-y-2">
        <h4 class="text-xl font-semibold leading-6 text-dark-blue">Deseja excluir a categoria?</h4>
        <div>
          <p class="text-base font-medium leading-5 text-greyscale-pure-grey">
            Essa ação é irreversível e implica na exclusão das subcategorias vinculadas.
          </p>
          <p class="text-base font-medium leading-5 text-greyscale-pure-grey">
            Os produtos ligados a essa categoria não serão excluídos.
          </p>
        </div>
      </div>
      <div class="flex flex-row space-x-2">
        <GenericButton
          round
          color="#FFE2EB"
          text-color="#DA3468"
          role="link"
          class="flex-1 h-11 disabled:bg-greyscale-light-grey disabled:text-greyscale-dark-grey"
          :disabled="pendingDeleteCategory"
          @click="closeModal"
        >
          Cancelar
        </GenericButton>
        <GenericButton
          round
          color="#DA3468"
          class="flex-1 h-11"
          @click="handleDeleteCategory"
          :loading="pendingDeleteCategory"
          >Excluir</GenericButton
        >
      </div>
    </div>
  </n-modal>
</template>
