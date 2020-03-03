<template>
 <div id="viewRecipes">
  <ul class="collection with-header">
    <li class="collection-header"><h3>{{name}}</h3></li>
    <li class="collection-item"><h5>What you must do:</h5><br>{{method}}</li>
    <li class="collection-item"><h5>Create in</h5> {{date}}</li>
    <li
    v-for="item in ingredients"
    v-bind:key="item.id"
    class="collection-item"
    >
    <div class="chip">
      {{item}}
    </div>
    </li>
  </ul>
  <router-link to="/" class="btn deep-purple lighten-1">Back</router-link>
  <button @click="deleteRecipe" class="btn deep-orange accent-4">Delete</button>

  <div class="fixed-action-btn">
     <router-link v-bind:to="{name:'editRecipes', params: {recipe_id : recipe_id}}" class="btn-floating btn-large indigo accent-4">
      <i class="fas fa-pen"></i>
     </router-link>
   </div>

 </div>
</template>

<script>
import db from './firebaseInit'
import deleteRecipe from '../services/DeleteRecipe'

export default {
  name: 'viewRecipes',
  data () {
    return {
      recipe_id: null,
      name: null,
      date: null,
      ingredients: null,
      method: null
    }
  },
  beforeRouteEnter (to, from, next) {
    db.collection('CookBook').where('recipe_id', '==', to.params.recipe_id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        next(vm => {
          vm.recipe_id = doc.data().recipe_id
          vm.name = doc.data().recipe_name
          vm.date = doc.data().recipe_date.toDate().toDateString()
          vm.ingredients = doc.data().recipe_ingredients
          vm.method = doc.data().recipe_method
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      db.collection('CookBook').where('recipe_id', '==', this.$route.params.recipe_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.recipe_id = doc.data().recipe_id
          this.name = doc.data().recipe_name
          this.date = doc.data().recipe_date
          this.ingredients = doc.data().recipe_ingredients
          this.method = doc.data().recipe_method
        })
      })
    },
    deleteRecipe () {
      if (confirm('Are you sure??')) {
        deleteRecipe.delete(this.$route.params.recipe_id)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>

</style>
