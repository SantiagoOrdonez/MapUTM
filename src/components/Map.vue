<template>
  <div id="app">
    <search-bar :route="route" ref="search"></search-bar>
    <scroll-bar ref="scroll"></scroll-bar>
    <div id="map" style="height: 100vh"></div>
  </div>
</template>

<script>
  import SearchBar from "./SearchBar"
  import ScrollBar from "./ScrollBar"
  const wrld = require("wrld.js");
  
  export default {
    name: 'app',
    components: {
      SearchBar,
      ScrollBar,
    },
    data() {
      return {
        msg: 'MapUTM',
        map: null,
        intitialLocation: [43.549, -79.6636], 
        // intitialLocation: [56.4602727, -2.9786788], // Dundee, UK // UTM: [43.549, -79.6636] 
        routeLines: []
      }
    },
    mounted() {
      this.map = wrld.map("map", "5378c39112e718bdeb6f19df0168d1cf", {
        center: this.intitialLocation, 
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
      this.map.indoors.on("indoormapexit", this.onIndoorMapExited);
      this.map.indoors.on("expand", this.onIndoorMapExpanded);
      this.map.indoors.on("collapse", this.onIndoorMapCollapsed);
      this.$refs.search.loadSearchbar(this.map);
      this.$refs.scroll.loadScrollbar(this.map);
      
      // const a = this.map.indoors.setFloor
      // this.map.indoors.setFloor = () => {
      //   console.log(arguments);
      //   setTimeout(a.bind(this.map.indoors, ...arguments), 5000);
      //   console.log("tested");
      // }
    },
    methods:{

      // TODO
      // - switch floors when asking for a search.
      // - delete routes when exiting a map.

      onEnter(){
        // this.map.blueSphere.setEnabled(true);
        // this.map.blueSphere.setLocation(this.intitialLocation);
        // this.map.blueSphere.setIndoorMap("westport_house", 0); // wot?
        // this.map.setView(this.intitialLocation.reverse(), 20);
      },
      route(destination){
        // const startPoint = [-2.978629, 56.46024, 0]; // Hardcoded Dundee Coordinates

        const endPoint = destination;
        const startPoint = [-79.6659923, 43.5503476, 0]; // UTM Test Coordinates
        
        // // DEBUGGING for the problem below.
        // const _onRoutesError = function(err) {
        //   console.log(err);
        // };

        this.map.routes.getRoute([startPoint, endPoint], this.onRoutesLoaded);
        
        // PROBLEM: a function is being called after route() that is affecting this.map.indoors.setFloor(). I cannot for the life of me find which function, 
        // I spent 6 hours with Arnav to try and fix this to no avail.
        // TEMPORARY SOLUTION: to change floors, call the function several times at varous delays.
        // this.map.indoors.setFloor(destination[2]);
        // setTimeout(() => this.map.indoors.setFloor(destination[2]), 1000);
        // setTimeout(() => this.map.indoors.setFloor(destination[2]), 1500);
        // setTimeout(() => this.map.indoors.setFloor(destination[2]), 2000);
      },
      onRoutesLoaded(routes){
        
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
      onIndoorMapExited() {
        console.log("Exited indoor map"); // TODO delete
        for (var routeIndex = 0; routeIndex < this.routeLines.length; ++routeIndex) {
          this.map.removeLayer(this.routeLines[routeIndex]);
        }
      },
      onIndoorMapExpanded() {
        console.log("Touching scrollbar?"); // TODO delete, this seems to happen every time, the scrollbar is moved, to adjust the map zoom.
        for (var routeIndex = 0; routeIndex < this.routeLines.length; ++routeIndex) {
          window.L.setOptions(this.routeLines[routeIndex], { displayOption: "currentIndoorMap" }); 
        }
      },
      onIndoorMapCollapsed() {
        console.log("Let go of scrollbar?"); // TODO delete, seems to be called every time i let go of the scrollbar.
        for (var routeIndex = 0; routeIndex < this.routeLines.length; ++routeIndex) {
          window.L.setOptions(this.routeLines[routeIndex], { displayOption: "currentFloor" }); 
        }
      },
      exitIndoors(){
        console.log("Exited indoor map")
        this.map.indoors.exit();
      },
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
#map {
  width: 100%;
  height: 100%;
}

</style>
