<template>
  <div id="app">
    <link href="https://cdn-webgl.wrld3d.com/wrldjs/addons/resources/latest/css/wrld.css" rel="stylesheet"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css" rel="stylesheet" />
    <div style="height:50px">
          <img style="height:70px" src="./assets/utm.png">
    </div>
    <Map />
  </div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    Map
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
