import { api } from '@/libs/axios/api'
import type { CategoryType } from '@/types/category-type'

interface PatchCategoryProps {
  category: CategoryType
}

export const patchCategory = async ({ category }: PatchCategoryProps) => {
  const { data } = await api.patch<CategoryType>(`/categories/${category?.id}`, {
    name: category?.name
  })
  return data
}
