import { api } from '@/libs/axios/api'
import type { CategoryType } from '@/types/category-type'

export const getCategories = async () => {
  const { data } = await api.get<CategoryType[]>('/categories')
  return data
}
