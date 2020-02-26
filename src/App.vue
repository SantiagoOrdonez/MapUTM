<template>
  <div id="app">

    <img src="./assets/UofT.png">

    <h1>{{ msg }}</h1>
    <div id="map"></div>
    <button v-on:click="goUp">Up</button>
    <button v-on:click="goDown">Down</button>
    <button v-on:click="exitIndoors">Exit</button>
    <button v-on:click="route">Get Route</button>


    <ul>
      <li><a href="https://leafletjs.com/" target="_blank">Leaflet</a></li>
      <li><a href="https://www.wrld3d.com/" target="_blank">WRLD</a></li>
      <li><a href="https://www.wrld3d.com/legal" target="_blank">Partners</a></li>
    </ul>
  </div>
</template>

<script>
  const Wrld = require("wrld.js");
  export default {
    name: 'app',
    mounted() {
      this.map = L.Wrld.map("map", "5378c39112e718bdeb6f19df0168d1cf", {
        // center: [43.549, -79.6636], // UTM
        center: [56.4602727, -2.9786788], // Dundee, UK
        zoom: 15,
        trafficEnabled: false,
        frameRateThrottleWhenIdleEnabled: true,
        throttledTargetFrameIntervalMilliseconds: 500,
        idleSecondsBeforeFrameRateThrottle: 15.0,
        indoorsEnabled: true,
        coverageTreeManifest: "https://webgl-cdn1.wrld3d.com/chunk/indoor_maps/api_requests/EIM-c3eb2f77-20e3-4b6b-bb11-784ced915fa0_2020_02_09_05_33_40/webgl_manifest.bin.gz",
        height: 500
      });
      this.map.indoors.on("indoormapenter", this.onEnter);
    },
    data() {
      return {
        msg: 'MapUTM',
        map: "",
        routeLines: []
      }
    },
    methods:{
      onEnter(event){
        console.log("Entering")
      },
      goUp(){
        this.map.indoors.moveUp();
      },
      goDown(){
        this.map.indoors.moveDown();

      },
      route(){
        const startPoint = [-2.978629, 56.46024, 0]; // Hardcoded Dundee Coordinates
        const endPoint = [-2.9783117, 56.4600344, 2];
        // const startPoint = [-79.6659923, 43.5503476, 0]; // UTM Test Coordinates
        // const endPoint = [-79.6665724, 43.5505642, 0];

        this.map.routes.getRoute([startPoint, endPoint], this.onRoutesLoaded);
        console.log(this.routeLines);
      },
      onRoutesLoaded(routes){
        console.log(routes[0])
        // Each step in the route will be on a single floor.
        for (let stepIndex = 0; stepIndex < routes[0].length; ++stepIndex) {
          const step = routes[0][stepIndex];
          const routeLine = new L.polyline(step.points,
            {
              indoorMapId: step.indoorMapId,
              indoorMapFloorId: step.indoorMapFloorId
            });
          routeLine.addTo(this.map);
          this.routeLines.push(routeLine);
        }
      },
      exitIndoors(){
        this.map.indoors.exit();
      }
    }
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
