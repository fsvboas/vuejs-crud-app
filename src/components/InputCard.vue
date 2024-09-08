<script setup lang="ts">
import type { CategoryType } from '@/types/category-type'
import { Check, Ellipsis, X } from 'lucide-vue-next'
import { NIcon, NInput } from 'naive-ui'
import { ref } from 'vue'
import GenericButton from './core/GenericButton.vue'

const props = defineProps<{
  category: CategoryType
}>()

const isEditMode = ref<boolean>(false)
const inputValue = ref<string>(props?.category.name || '')

const handleEditMode = () => {
  // OPEN/CLOSE THE EDIT MENU
  isEditMode.value = !isEditMode.value
}

const submitChange = () => {
  // TO-DO: SUBMIT CATEGORY NAME CHANGE (PATCH)
  isEditMode.value = false
}
</script>

<template>
  <!-- TO-DO: CHANGE TEXT INPUT COLOR WHEN IN DISABLED STATE -->
  <div class="relative items-center w-full">
    <n-input
      :default-value="props.category.name"
      placeholder=""
      maxlength="48"
      round
      :bordered="isEditMode === true"
      :v-model:value="inputValue"
      :disabled="isEditMode === false"
      :class="{
        'text-base h-[52px] items-center bg-transparent': true,
        '!bg-[#F3F3F5] ': isEditMode === false
      }"
    />
    <GenericButton
      v-if="isEditMode === false"
      quaternary
      round
      class="absolute right-2 top-2 h-9 w-9 p-0"
      @click="handleEditMode"
    >
      <Ellipsis class="text-brand-pure-pink h-4 w-4" />
    </GenericButton>

    <div v-else class="flex space-x-2 absolute right-2 top-2">
      <GenericButton color="#FFE2EB" round class="h-9 w-9" @click="handleEditMode">
        <n-icon color="#DA3468" size="13">
          <X />
        </n-icon>
      </GenericButton>
      <GenericButton color="#DA3468" round class="h-9 w-9" @click="submitChange">
        <n-icon color="#FFFFFF" size="13">
          <Check />
        </n-icon>
      </GenericButton>
    </div>
  </div>
</template>
