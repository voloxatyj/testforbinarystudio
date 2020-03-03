<template>
 <div id="editRecipes">
  <h3>editRecipes</h3>
  <div class="row">
     <form @submit.prevent="updateRecipe" class="col s12">
       <div class="row">
        <div class="input-field col s12">
          <input type="number"
          v-model="recipe_id"
          disabled
          >
        </div>
       <div class="row">
        <div class="input-field col s12">
          <input type="text"
          v-model="name"
          required
          v-reset-input
          >
        </div>
       </div>
       <div class="row">
        <div class="input-field col s12">
          <input type="text"
          v-model="method"
          required
          v-reset-input
          >
        </div>
       </div>
       <div class="row">
        <div class="input-field col s12">
          <input type="text"
          v-model="ingredients"
          @change="someHandler"
          required
          v-reset-input
          >
        </div>
       </div>
      </div>
      <button type="submit" class="btn">Submit</button>
      <router-link to="/" class="btn orange lighten-1">Cancel</router-link>
     </form>
   </div>
 </div>
</template>

<script>
import db from './firebaseInit'
import updateRecipe from '../services/UpdateRecipe'

export default {
  name: 'editRecipes',
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
      db.collection('CookBook')
        .where('recipe_id', '==', this.$route.params.recipe_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.recipe_id = doc.data().recipe_id
            this.name = doc.data().recipe_name
            this.date = doc.data().recipe_date
            this.ingredients = doc.data().recipe_ingredients
            this.method = doc.data().recipe_method
          })
        })
    },
    someHandler (val) {
      this.ingredients = val.target.value.split(',')
    },
    updateRecipe () {
      try {
        updateRecipe.update({
          recipe_id: Number(this.recipe_id),
          recipe_name: String(this.name),
          recipe_ingredients: this.ingredients,
          recipe_method: String(this.method),
          recipe_date: null
        }, this.$route.params.recipe_id)
        this.$router.push({name: 'viewRecipes', params: {recipe_id: this.recipe_id}})
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
