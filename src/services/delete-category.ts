import { api } from '@/libs/axios/api'
import type { CategoryType } from '@/types/category-type'

interface DeleteCategoryProps {
  categoryId: CategoryType['id']
}

export const deleteCategory = async ({ categoryId }: DeleteCategoryProps) => {
  const { data } = await api.delete<CategoryType>(`/categories/${categoryId}`, {
    params: {
      forceDeleteTree: true
    }
  })
  return data
}
