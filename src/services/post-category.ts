import { api } from '@/libs/axios/api'
import type { CategoryType } from '@/types/category-type'

interface PostCategoryProps {
  name: string
  parent?: { id: string }
}

export const postCategory = async (category: PostCategoryProps) => {
  const { data } = await api.post<CategoryType>('/categories', category)
  return data
}
