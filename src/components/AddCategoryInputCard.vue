<script setup lang="ts">
import type { CategoryType } from '@/types/category-type'
import { Check, Plus, X } from 'lucide-vue-next'
import { NIcon, NInput } from 'naive-ui'
import { ref } from 'vue'
import GenericButton from './core/GenericButton.vue'

const props = defineProps<{
  pendingCreateCategory: boolean
}>()

const emit = defineEmits<{
  (event: 'submitForm', categoryName: CategoryType['name']): void
}>()

const actionMenuRef = ref<HTMLElement | null>(null)
const isInputActive = ref<boolean>(false)
const inputValue = ref<string>('Adicionar subcategoria')

const handleInputActive = () => {
  isInputActive.value = !isInputActive.value
  if (isInputActive.value === true) {
    inputValue.value = ''
  } else {
    inputValue.value = 'Adicionar subcategoria'
  }
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
        @click="emit('submitForm', inputValue)"
        :loading="props.pendingCreateCategory"
      >
        <n-icon size="13" v-show="!props.pendingCreateCategory">
          <Check class="text-white" />
        </n-icon>
      </GenericButton>
    </div>
  </div>
</template>
