import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MyCategoriesView from '../views/MyCategories.vue'
import MySubcategoriesView from '../views/MySubcategories.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/my-categories',
      name: 'my-categories',
      component: MyCategoriesView
    },
    {
      path: '/my-subcategories',
      name: 'my-subcategories',
      component: MySubcategoriesView
    }
  ]
})

export default router
