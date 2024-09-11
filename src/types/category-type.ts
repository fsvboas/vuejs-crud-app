export type CategoryType = {
  id: string
  createdAt?: string
  updatedAt?: string
  name: string
  parent?: { id: string }
  children?: string[]
  hasChildren?: true
}
