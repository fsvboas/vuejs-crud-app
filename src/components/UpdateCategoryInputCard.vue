<script setup lang="ts">
import type { CategoryType } from '@/types/category-type'
import { Check, Ellipsis, X } from 'lucide-vue-next'
import { NIcon, NInput } from 'naive-ui'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import ActionMenu from './ActionMenu.vue'
import GenericButton from './core/GenericButton.vue'

const props = defineProps<{
  category: CategoryType
  pendingPatchCategory: boolean
  isEditMode: boolean
  inputReadOnlyState: boolean
}>()

const emit = defineEmits<{
  (event: 'submitForm', categoryName: CategoryType['name']): void
  (event: 'updateEditMode', value: boolean): void
}>()

const actionMenuRef = ref<HTMLElement | null>(null)
const showActionMenu = ref<boolean>(false)
const inputValue = ref<string>(props?.category.name || '')

const handleEditMode = () => {
  showActionMenu.value = false
  emit('updateEditMode', !props.isEditMode)
  inputValue.value = props.category.name
}

const handleOpenActionMenu = () => {
  showActionMenu.value = !showActionMenu.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (actionMenuRef.value && !actionMenuRef.value.contains(event.target as Node)) {
    showActionMenu.value = false
  }
}
onMounted(() => {
  nextTick(() => {
    document.addEventListener('click', handleClickOutside)
  })
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <!-- TO-DO: CHANGE TEXT INPUT COLOR WHEN IN DISABLED STATE -->
  <div class="relative items-center w-full" ref="actionMenuRef">
    <n-input
      :default-value="props.category.name"
      placeholder=""
      maxlength="48"
      :bordered="props.isEditMode === true"
      v-model:value="inputValue"
      :disabled="props.isEditMode === false"
      :class="{
        'text-base h-[52px] items-center bg-transparent rounded-[14px]': true,
        '!bg-[#F3F3F5] ': props.isEditMode === false
      }"
      :readonly="props.inputReadOnlyState"
    />
    <!-- Workaround to close ActionMenu component -->
    <div
      v-if="showActionMenu === true"
      class="absolute inset-0 z-10"
      @click="handleOpenActionMenu"
    />
    <!-- ---------------------------------------- -->
    <GenericButton
      v-if="props.isEditMode === false"
      quaternary
      round
      class="absolute right-2 top-2 h-9 w-9 p-0 z-40"
      @click="handleOpenActionMenu"
    >
      <Ellipsis class="text-brand-pure-pink h-4 w-4" />
    </GenericButton>
    <div v-else class="flex space-x-2 absolute right-2 top-2">
      <GenericButton
        color="#FFE2EB"
        text-color="#DA3468"
        round
        class="h-9 w-9 disabled:bg-greyscale-light-grey disabled:!text-greyscale-dark-grey"
        @click="handleEditMode"
        :disabled="props.pendingPatchCategory"
      >
        <n-icon size="13">
          <X />
        </n-icon>
      </GenericButton>
      <GenericButton
        color="#DA3468"
        round
        :class="`${props.pendingPatchCategory ? 'pl-1' : 'pl-0'} h-9 w-9`"
        @click="emit('submitForm', inputValue)"
        :loading="props.pendingPatchCategory"
      >
        <n-icon size="13" v-show="!props.pendingPatchCategory">
          <Check class="text-white" />
        </n-icon>
      </GenericButton>
    </div>
    <ActionMenu
      v-show="showActionMenu"
      :category-id="props.category.id"
      @editMode="handleEditMode"
    />
  </div>
</template>
