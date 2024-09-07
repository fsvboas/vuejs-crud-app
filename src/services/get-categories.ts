import { api } from '@/libs/axios/api'

export const getCategories = async () => {
  const { data } = await api.get<any>('/categories')
  return data
}
