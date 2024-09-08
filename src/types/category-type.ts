export type CategoryType = {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  parent: string
  children: [string]
  hasChildren: true
}
