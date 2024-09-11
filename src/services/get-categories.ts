import { api } from '@/libs/axios/api'
import type { CategoryType } from '@/types/category-type'

interface GetCategoriesProps {
  parentCategoryId?: CategoryType['id']
}

export const getCategories = async ({ parentCategoryId }: GetCategoriesProps) => {
  const { data } = await api.get<CategoryType[]>('/categories', {
    params: {
      parentCategoryId: parentCategoryId
    }
  })
  return data
}
