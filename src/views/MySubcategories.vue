<script setup lang="ts">
import ContentContainer from '@/components/ContentContainer.vue'
import Accordion from '@/components/core/Accordion.vue'
import CreateSubcategoryForm from '@/components/CreateSubcategoryForm.vue'
import InputCardSkeletonPlaceholder from '@/components/skeletons/InputCardSkeletonPlaceholder.vue'
import UpdateCategoryForm from '@/components/UpdateCategoryForm.vue'
import { getCategories } from '@/services/get-categories'
import type { CategoryType } from '@/types/category-type'
import { useQueries, useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

const { data: categoriesData, isLoading: isLoadingCategoriesData } = useQuery({
  queryKey: ['categories'],
  queryFn: () => getCategories({})
})

const categories = computed(() => categoriesData.value || [])
const hasSubcategories = computed(() =>
  categories.value.filter((category) => category.hasChildren === true)
)
const subcategoryIds = computed(() => hasSubcategories.value.map((category) => category.id))

const subcategoriesResults = useQueries({
  queries: subcategoryIds.value.map((parentCategoryId) => ({
    queryKey: ['subcategory', parentCategoryId],
    queryFn: () => getCategories({ parentCategoryId })
  }))
})

const subcategoriesValue = computed(() => subcategoriesResults.value || [])
const subcategoriesIsLoading = computed(() =>
  subcategoriesValue.value.some((subcategory) => subcategory.isLoading)
)

const subcategoriesDataMap = computed(() => {
  if (!subcategoriesValue.value) return
  return subcategoriesValue.value.flatMap((subcategory) => subcategory.data || [])
})

const subcategoriesFilter = (parentId: CategoryType['id']) => {
  if (!subcategoriesDataMap.value) return

  return subcategoriesDataMap.value.filter((subcategory) => subcategory?.parent?.id === parentId)
}
</script>

<template>
  <ContentContainer>
    <h2 class="text-base text-[#737F9C] leading-5 mb-4">
      Adicione as subcategorias abaixo das categorias pai
    </h2>
    <div class="w-full space-y-3" v-if="!isLoadingCategoriesData && !subcategoriesIsLoading">
      <Accordion v-for="category in categories" v-bind:key="category.id" :title="category.name">
        <CreateSubcategoryForm :parent-id="category.id" />
        <UpdateCategoryForm
          v-for="subcategory in subcategoriesFilter(category.id)"
          v-bind:key="subcategory?.id"
          :category="subcategory"
        />
      </Accordion>
    </div>
    <div class="w-full space-y-3" v-else>
      <InputCardSkeletonPlaceholder />
    </div>
  </ContentContainer>
</template>
