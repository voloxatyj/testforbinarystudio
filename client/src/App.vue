<template>
  <div id="app">
    <Navbar />
    <div class="container">
     <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 80rem;
}

@media (max-width) {
 img {
  display: block;
  margin: auto;
  }
}
</style>
