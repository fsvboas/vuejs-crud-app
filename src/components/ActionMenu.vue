<script setup lang="ts">
import type { CategoryType } from '@/types/category-type'
import { Pencil, Trash2 } from 'lucide-vue-next'
import { NIcon } from 'naive-ui'
import { ref } from 'vue'
import GenericButton from './core/GenericButton.vue'
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'

const props = defineProps<{
  categoryId: CategoryType['id']
}>()

const showConfirmationDeleteModal = ref(false)

const handleShowConfirmationDeleteModal = () =>
  (showConfirmationDeleteModal.value = !showConfirmationDeleteModal.value)

const emit = defineEmits<{
  (event: 'editMode'): void
}>()
</script>

<template>
  <div
    class="bg-white w-36 h-fit rounded-xl py-2 border border-[#DDE2EF] space-y-2 absolute right-0 z-50"
  >
    <GenericButton
      quaternary
      class="w-full h-full py-2 px-4 !justify-start"
      @click="emit('editMode')"
    >
      <n-icon size="16">
        <Pencil color="#DA3468" />
      </n-icon>
      <span class="ml-2 text-base text-[#29354F]">Renomear</span>
    </GenericButton>
    <GenericButton
      quaternary
      class="w-full h-full py-2 px-4 !justify-start"
      @click="handleShowConfirmationDeleteModal"
    >
      <n-icon size="16">
        <Trash2 color="#DA3468" />
      </n-icon>
      <span class="ml-2 text-base text-[#29354F] w-full">Excluir</span>
    </GenericButton>
    <DeleteConfirmationModal
      v-model:showModal="showConfirmationDeleteModal"
      :categoryId="props.categoryId"
    />
  </div>
</template>
