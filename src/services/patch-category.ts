import { api } from '@/libs/axios/api'
import type { CategoryType } from '@/types/category-type'

interface PatchCategoryProps {
  categoryId: CategoryType['id']
  categoryName: CategoryType['name']
}

export const patchCategory = async ({ categoryId, categoryName }: PatchCategoryProps) => {
  const { data } = await api.patch<CategoryType>(`/categories/${categoryId}`, categoryName)
  return data
}
