<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer.vue'
import GenericButton from '@/components/core/GenericButton.vue'
import EmptyState from '@/components/EmptyState.vue'
import InputCard from '@/components/InputCard.vue'
import { getCategories } from '@/services/get-categories'
import { useQuery } from '@tanstack/vue-query'
import { NInput } from 'naive-ui'
import { computed, ref } from 'vue'

const inputValue = ref<string>('')

const { data, isLoading } = useQuery({
  queryKey: ['/categories'],
  queryFn: () => getCategories()
})

const categories = computed(() => data.value || [])
</script>

<template>
  <ContentContainer>
    <div class="flex space-x-2 h-11">
      <!-- TO-DO: change the input border color -->
      <n-input
        placeholder="Crie uma categoria"
        round
        maxlength="48"
        class="h-full items-center text-base"
        v-model:value="inputValue"
      />
      <GenericButton
        round
        :disabled="!inputValue.trim()"
        color="#DA3468"
        class="w-20 h-full disabled:bg-greyscale-light-grey disabled:text-greyscale-dark-grey"
      >
        Criar
      </GenericButton>
    </div>
    <div class="flex w-full justify-center my-4">
      <div class="w-full space-y-3" v-if="categories.length">
        <InputCard :category="category" v-for="category in categories" v-bind:key="category.id" />
      </div>
      <!-- TO-DO: PENDING (SKELETON PLACEHOLDER) -->
      <div v-else-if="isLoading === true">CARREGANDO</div>
      <div v-else><EmptyState /></div>
    </div>
  </ContentContainer>
</template>
