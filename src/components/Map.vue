<template>
  <div id="app">

    <img src="../assets/UofT.png">

    <h1>{{ msg }}</h1>
    <!--<button v-on:click="findBlueSphere">click me</button>-->
    <!-- Searchbar container -->
    <search-bar :route="route" ref="search"></search-bar>
    <div id="map" style="height: 100vh"></div>
    <!-- <div id="searchbar-widget-container" class="wrld-widget-container"></div> -->

    <!-- Scrollbar container -->
    <!-- <div id="indoor-control-widget-container" style="position: absolute; right: 10px; top: 10px; bottom: 26px"></div> -->

    <ul>
      <li><a href="https://leafletjs.com/" target="_blank">Leaflet</a></li>
      <li><a href="https://www.wrld3d.com/" target="_blank">WRLD</a></li>
      <li><a href="https://www.wrld3d.com/legal" target="_blank">Partners</a></li>
    </ul>
  </div>
</template>

<script>
  import SearchBar from "./SearchBar"
  const wrld = require("wrld.js");
  
  export default {
    name: 'app',
    components: {
      SearchBar,
    },
    mounted() {
      this.map = wrld.map("map", "5378c39112e718bdeb6f19df0168d1cf", {
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
      //this.map.on("initialstreamingcomplete", this.onInitialStreamingComplete);
      this.$refs.search.loadSearchbar(this.map);
    },
    data() {
      return {
        msg: 'MapUTM',
        map: null,
        routeLines: []
      }
    },
    methods:{
      onEnter(event){
        console.log(event);
        // this.map.on("oninitialstreamingcomplete", this.onInitialStreamingComplete);
        this.map.blueSphere.setEnabled(true);
        this.map.blueSphere.setLocation([56.46024, -2.978629]);
        this.map.blueSphere.setIndoorMap("westport_house", 0);
        this.map.setView([56.46024, -2.978629], 20);
      },
      route(destination){
        const startPoint = [-2.978629, 56.46024, 0]; // Hardcoded Dundee Coordinates
        const endPoint = destination;
        // const startPoint = [-79.6659923, 43.5503476, 0]; // UTM Test Coordinates
        // const endPoint = [-79.6665724, 43.5505642, 0];
        this.map.on("initialstreamingcomplete", this.onInitialStreamingComplete);

        this.map.routes.getRoute([startPoint, endPoint], this.onRoutesLoaded);
        console.log(this.routeLines);
      },
      onRoutesLoaded(routes){
        console.log(routes[0])
        // Each step in the route will be on a single floor.
        for (let stepIndex = 0; stepIndex < routes[0].length; ++stepIndex) {
          const step = routes[0][stepIndex];
          const routeLine = new window.L.polyline(step.points,
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
      },
      // onInitialStreamingComplete() {
      //   this.map.blueSphere.setEnabled(true);
      //   this.map.blueSphere.setLocation([-2.978629, 56.46024]);
      //   this.map.blueSphere.setIndoorMap("westport_house", 0);
      // },
      // findBlueSphere() {
      //   this.map.setView([-2.978629, 56.46024, 5]);
      // }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
  color: #42b983;
}
</style>
