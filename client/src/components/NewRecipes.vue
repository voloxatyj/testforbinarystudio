<template>
 <div id="newRecipes">
  <h3>NewRecipes</h3>
   <div class="row">
     <form @submit.prevent="addRecipe" class="col s12">
       <div class="row">
        <div class="input-field col s12">
          <input type="number"
          required
          disabled
          >
          <label>Recipe ID#</label>
        </div>
       <div class="row">
        <div class="input-field col s12">
          <input type="text"
          v-model="name"
          required
          v-reset-input
          >
          <label>Recipe Name</label>
        </div>
       </div>
       <div class="row">
        <div class="input-field col s12">
          <input type="text"
          v-model="method"
          required
          v-reset-input
          >
          <label>Method of create Recipe</label>
        </div>
       </div>
       <div class="row">
        <div class="input-field col s12">
          <input type="text"
          class="reset-input"
          v-model="text"
          ref=input
          @keypress.enter.prevent="addIngredients()"
          v-reset-input
          >
          <label>Ingredients of Recipe</label>
          <i class="fa fa-plus" @click="addIngredients()"></i>
            <ul class="collection with-header" v-if="this.ingredients.length > 0">
              <li
              v-for="item in ingredients"
              v-bind:key="ingredients[item]"
              v-bind:id="item"
              class="collection-item"
              >
              <div class="chip">
                {{item}}
              </div>
              <i class="fa fa-trash" @click="removeIngredients(item)"></i>
              </li>
            </ul>
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
import AddRecipe from '../services/AddRecipe'

export default {
  name: 'newRecipes',
  data () {
    return {
      recipe_id: +this.$route.params.recipes.length + 1,
      name: null,
      ingredients: [],
      method: null,
      text: ''
    }
  },
  methods: {
    addIngredients () {
      if (this.$refs.input.value !== '') {
        this.ingredients.push(this.$refs.input.value)
        this.text = ''
      }
    },
    removeIngredients (value) {
      if (this.ingredients.length === 1) {
        this.ingredients.pop(1)
      } else {
        this.ingredients.filter(item => item !== value ? console.log(this.ingredients) : console.log(item, value))
      }
    },
    async addRecipe () {
      try {
        if (this.ingredients.length > 0 && this.$refs.input.value === '') {
          await AddRecipe.add({
            recipe_id: Number(this.recipe_id),
            recipe_name: String(this.name),
            recipe_ingredients: Array.from(this.ingredients),
            recipe_method: String(this.method),
            recipe_date: null
          }, this.$router.push('/'))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.reset-input {
    font-size: 1.5em;
    padding: 10px 15px;
    box-shadow: none;
    border: 1px solid #157977;
    width: 100%;
    outline: none;
    background-color: #eee;
}

.v-reset-input {
    top: 8px;
    right: 25px;
    font-size: 1.5em;
    display: none;
}

.v-reset-input.v-reset-input-active {
    display: block;
}
</style>
