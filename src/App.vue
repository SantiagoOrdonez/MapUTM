<template>
  <div id="app">
    
    <!--<script src="https://cdn-webgl.wrld3d.com/wrldjs/dist/latest/wrld.js"></script>dir-->
    <!--<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css" rel="stylesheet" />-->

    <!--<img src="./assets/UofT.png">-->

    <!-- <h1>{{ msg }}</h1> -->
    <div id="widget-container" class="wrld-widget-container"></div>
    <div id="map" style="height: 100vh"></div>
    
    <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css" rel="stylesheet" />

    <link href="https://cdn-webgl.wrld3d.com/wrldjs/addons/resources/latest/css/wrld.css" rel="stylesheet"/>
    <!--<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
    <script src="https://cdn-webgl.wrld3d.com/wrldjs/addons/indocontrol/latest/indoor_control.js"></script>-->

    <!--<h2>Essential Links</h2>
    <ul>
      <li><a href="https://leafletjs.com/" target="_blank">Leaflet</a></li>
      <li><a href="https://www.wrld3d.com/" target="_blank">WRLD</a></li>
      <li><a href="https://www.wrld3d.com/legal" target="_blank">Partners</a></li>
    </ul>-->

  </div>
</template>

<script>

import { onLoadScrollbar }  from './indoor_control';
const Wrld = require("wrld.js")

export default {
  name: 'app',
  mounted() {
    var map = L.Wrld.map("map", "3cd9616c750d2d11c80f85d0a2cf32f0", {
      center: [43.549, -79.6636],
      zoom: 15,
      trafficEnabled: false,
      frameRateThrottleWhenIdleEnabled: true,
      throttledTargetFrameIntervalMilliseconds: 500,
      idleSecondsBeforeFrameRateThrottle: 15.0,
      indoorsEnabled: true
    });

    //setTimeout(function() {
      // zooms in on a very precise area
      /* TODO: get precise coordinates of DH
      */
      //var bounds = L.latLngBounds([43.54, -79.66], [43.54, -79.66]);
      //map.fitBounds(bounds);
    //}, 3000);

    onLoadScrollbar(map)
  },
  
  data () {
    return {
      msg: ''
    }
  },
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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