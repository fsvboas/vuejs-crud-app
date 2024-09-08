<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer.vue'
import GenericButton from '@/components/core/GenericButton.vue'
import EmptyState from '@/components/EmptyState.vue'
import { NInput } from 'naive-ui'
import { ref } from 'vue'

const inputValue = ref<string>('')
</script>

<template>
  <ContentContainer>
    <div class="flex space-x-2 h-11">
      <!-- TO-DO: change the input border color -->
      <n-input
        placeholder="Crie uma categoria"
        round
        maxlength="48"
        class="h-full items-center"
        v-model:value="inputValue"
      />
      <GenericButton
        round
        :disabled="!inputValue.trim()"
        color="#DA3468"
        class="w-20 h-full disabled:bg-greyscale-light-grey disabled:opacity-100 disabled:text-greyscale-dark-grey"
      >
        Criar
      </GenericButton>
    </div>
    <EmptyState />
  </ContentContainer>
</template>
