import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import EditRecipes from '@/components/EditRecipes'
import NewRecipes from '@/components/NewRecipes'
import ViewRecipes from '@/components/ViewRecipes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'newRecipes',
      component: NewRecipes
    },
    {
      path: '/edit/:recipe_id',
      name: 'editRecipes',
      component: EditRecipes
    },
    {
      path: '/:recipe_id',
      name: 'viewRecipes',
      component: ViewRecipes
    }
  ]
})
