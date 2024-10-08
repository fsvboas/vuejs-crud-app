<script lang="ts" setup>
import WarningSvg from '@/assets/svg/warning.svg'
import { useToast } from '@/hooks/use-vue-toast'
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

const { showSuccess, showError } = useToast()

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
    showSuccess({ message: 'Categoria deletada com sucesso!', position: 'top-right' })
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    queryClient.invalidateQueries({ queryKey: ['subcategories'] })
    closeModal()
  },
  onError: (error) => {
    showError({ message: error.message, position: 'top-right' })
  }
})

const handleDeleteCategory = () => {
  del({ categoryId: props.categoryId })
}
</script>

<template>
  <n-modal v-model:show="showModal" :mask-closable="false" transform-origin="center">
    <div class="max-[380px]:mx-7">
      <div
        class="bg-white rounded-3xl p-4 w-full max-w-80 md:max-w-96 h-fit flex flex-col space-y-4"
      >
        <img :src="WarningSvg" alt="warning-icon" class="self-center w-20 h-20" />
        <div class="space-y-2">
          <h4 class="text-xl font-semibold leading-6 text-dark-blue">
            Deseja excluir a categoria?
          </h4>
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
    </div>
  </n-modal>
</template>
