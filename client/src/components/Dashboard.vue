<template>
 <div id="dashboard">
  <ul class="collection with-header">
    <li class="collection-header">
      <h4>Recipes</h4>
      <button @click="sortByDate" type="submit" class="btn deep-orange accent-1">SortBy</button>
    </li>
    <li
    v-for="recipe in recipes"
    v-bind:key="recipe.id"
    class="collection-item"
    >
    <div class="chip">
      {{recipe.recipe_id}}
    </div>
      {{recipe.name}}
    <div class="chip">
      {{recipe.date}}
    </div>
    <router-link v-bind:to="{name: 'viewRecipes', params: {recipe_id: recipe.recipe_id}}">
      <i class="fa fa-eye"></i>
    </router-link>
    </li>
  </ul>
   <div class="fixed-action-btn">
     <router-link v-bind:to="{name: 'newRecipes', params: {recipes: recipes}}" class="btn-floating btn-large indigo accent-4">
      <i class="fas fa-concierge-bell"></i>
     </router-link>
   </div>
 </div>
</template>

<script>
import RenderRecipe from '../services/RenderRecipe'

export default {
  name: 'dashboard',
  data () {
    return {
      recipes: []
    }
  },
  async created () {
    try {
      const response = await RenderRecipe.render()
      response.data.forEach(item => this.recipes.push(item))
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    sortByDate () {
      this.recipes.sort((a, b) => {
        a = a.date.split('/').reverse().join('')
        b = b.date.split('/').reverse().join('')
        return a > b ? 1 : a < b ? -1 : 0
      })
    }
  }
}
</script>

<style>

</style>
