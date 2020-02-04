<template>
  <div id="app">
    
    <!--<script src="https://cdn-webgl.wrld3d.com/wrldjs/dist/latest/wrld.js"></script>dir-->
    <!--<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css" rel="stylesheet" />-->

    <img src="./assets/UofT.png">

    <h1>{{ msg }}</h1>
    <div id="map" style="height: 500px;"></div>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css" rel="stylesheet" />

    <!--<h2>Essential Links</h2>
    <ul>
      <li><a href="https://leafletjs.com/" target="_blank">Leaflet</a></li>
      <li><a href="https://www.wrld3d.com/" target="_blank">WRLD</a></li>
      <li><a href="https://www.wrld3d.com/legal" target="_blank">Partners</a></li>
    </ul>-->

  </div>
</template>

<script>
const Wrld = require("wrld.js")
export default {
  name: 'app',
  mounted() {
    var map = L.Wrld.map("map", "3cd9616c750d2d11c80f85d0a2cf32f0", {
      center: [43.549, -79.6636],
      zoom: 15
    });

    //setTimeout(function() {
      // zooms in on a very precise area
      /* TODO: get precise coordinates of DH
      */
      //var bounds = L.latLngBounds([43.54, -79.66], [43.54, -79.66]);
      //map.fitBounds(bounds);
    //}, 3000);
  },
  
  data () {
    return {
      msg: ''
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #033267;
}
</style>