<script setup lang="ts">
import type { CategoryType } from '@/types/category-type'
import { Check, Plus, X } from 'lucide-vue-next'
import { NIcon, NInput } from 'naive-ui'
import { ref } from 'vue'
import GenericButton from './core/GenericButton.vue'

const props = defineProps<{
  pendingCreateCategory: boolean
  isInputActive: boolean
  inputReadOnlyState: boolean
}>()

const emit = defineEmits<{
  (event: 'submitForm', categoryName: CategoryType['name']): void
  (event: 'updateInputActiveState', value: boolean): void
}>()

const actionMenuRef = ref<HTMLElement | null>(null)
const inputValue = ref<string>('Adicionar uma categoria')

const handleInputActive = () => {
  emit('updateInputActiveState', !props.isInputActive)

  // workaround to reset input
  if (!props.isInputActive) {
    return (inputValue.value = '')
  } else {
    return (inputValue.value = 'Adicionar uma categoria')
  }
}

const handleSubmitValue = () => {
  emit('submitForm', inputValue.value)
  // workaround to reset input
  setTimeout(() => {
    inputValue.value = 'Adicionar uma categoria'
  }, 1500)
}
</script>

<template>
  <!-- TO-DO: CHANGE TEXT INPUT COLOR WHEN IN DISABLED STATE -->
  <div class="relative items-center w-full" ref="actionMenuRef">
    <n-input
      placeholder=""
      maxlength="48"
      :bordered="isInputActive === true"
      v-model:value="inputValue"
      :disabled="isInputActive === false"
      :class="{
        'text-base h-[52px] items-center bg-transparent rounded-[14px]': true,
        '!bg-[#F3F3F5] ': isInputActive === false
      }"
      :readonly="props.inputReadOnlyState"
    />
    <GenericButton
      v-if="isInputActive === false"
      quaternary
      round
      class="absolute right-2 top-2 h-9 w-9 p-0 z-40"
      @click="handleInputActive"
    >
      <Plus color="#DA3468" :size="18" />
    </GenericButton>
    <div v-else class="flex space-x-2 absolute right-2 top-2">
      <GenericButton
        color="#FFE2EB"
        text-color="#DA3468"
        round
        class="h-9 w-9 disabled:bg-greyscale-light-grey disabled:!text-greyscale-dark-grey"
        @click="handleInputActive"
        :disabled="props.pendingCreateCategory"
      >
        <n-icon size="13">
          <X />
        </n-icon>
      </GenericButton>
      <GenericButton
        color="#DA3468"
        round
        :class="`${props.pendingCreateCategory ? 'pl-1' : 'pl-0'} h-9 w-9`"
        @click="handleSubmitValue"
        :loading="props.pendingCreateCategory"
      >
        <n-icon size="13" v-show="!props.pendingCreateCategory">
          <Check class="text-white" />
        </n-icon>
      </GenericButton>
    </div>
  </div>
</template>
