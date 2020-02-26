<template>
  <div id="app">
    
    <!--<script src="https://cdn-webgl.wrld3d.com/wrldjs/dist/latest/wrld.js"></script>dir-->
    <!--<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css" rel="stylesheet" />-->

    <img src="./assets/UofT.png">

    <h1>{{ msg }}</h1>
    <!-- Searchbar container -->
    <div id="searchbar-widget-container" style="padding-top: 52vh" class="wrld-widget-container"></div>
    <div id="map" style="height: 100vh"></div>
    <!-- <div id="searchbar-widget-container" class="wrld-widget-container"></div> -->

    <!-- Scrollbar container -->
    <!-- <div id="indoor-control-widget-container" style="position: absolute; right: 10px; top: 10px; bottom: 26px"></div> -->

    <link href="https://cdn-webgl.wrld3d.com/wrldjs/addons/resources/latest/css/wrld.css" rel="stylesheet"/>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css" rel="stylesheet" />


    <!--<h2>Essential Links</h2>-->
    <ul>
      <li><a href="https://leafletjs.com/" target="_blank">Leaflet</a></li>
      <li><a href="https://www.wrld3d.com/" target="_blank">WRLD</a></li>
      <li><a href="https://www.wrld3d.com/legal" target="_blank">Partners</a></li>
    </ul>
  
  </div>
</template>

<script>
import { loadSearchbar } from './search-bar.js';
const Wrld = require("wrld.js")

export default {
  name: 'app',
  mounted() {
    var map = L.Wrld.map("map", "5378c39112e718bdeb6f19df0168d1cf", {
      // center: [43.549, -79.6636],
      center: [56.4602727, -2.9786788],
      zoom: 15,
      trafficEnabled: false,
      frameRateThrottleWhenIdleEnabled: true,
      throttledTargetFrameIntervalMilliseconds: 500,
      idleSecondsBeforeFrameRateThrottle: 15.0,
      indoorsEnabled: true,
      coverageTreeManifest: "https://webgl-cdn1.wrld3d.com/chunk/indoor_maps/api_requests/EIM-c3eb2f77-20e3-4b6b-bb11-784ced915fa0_2020_02_09_05_33_40/webgl_manifest.bin.gz"
    });

    loadSearchbar(map);
  },
  
  data () {
    return {
      msg: 'MapUTM'
    }
  },
};
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
