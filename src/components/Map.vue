<template>
    <div id="app">
        <search-bar :route="route" ref="search"></search-bar>
        <scroll-bar ref="scroll"></scroll-bar>
        <div id="map" style="height: 100vh"></div>
    </div>
</template>

<script>
<<<<<<< HEAD
    import SearchBar from "./SearchBar"
    import ScrollBar from "./ScrollBar"
    import {mapActions, mapGetters} from "vuex";

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
                initialLocation: [43.549, -79.6636], // [56.4602727, -2.9786788], // Dundee, UK // UTM: [43.549, -79.6636]
            }
        },
        mounted() {
            this.map = wrld.map("map", "5378c39112e718bdeb6f19df0168d1cf", {
                center: this.initialLocation,
                zoom: 15,
                trafficEnabled: false,
                frameRateThrottleWhenIdleEnabled: true,
                throttledTargetFrameIntervalMilliseconds: 500,
                idleSecondsBeforeFrameRateThrottle: 15.0,
                indoorsEnabled: true,
                coverageTreeManifest: "https://webgl-cdn1.wrld3d.com/chunk/indoor_maps/api_requests/EIM-c3eb2f77-20e3-4b6b-bb11-784ced915fa0_2020_02_09_05_33_40/webgl_manifest.bin.gz",
                height: 500
=======
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
        intitialLocation: [43.549, -79.6636], // UTM
        // intitialLocation: [56.4602727, -2.9786788], // Dundee, UK 
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
    },
    methods:{

      // TODO
      // - delete routes when exiting a map.

      onEnter(){

      },
      route(destination){
        // const startPoint = [-2.978629, 56.46024, 0]; // Hardcoded Dundee Coordinates
        const startPoint = [-79.6659923, 43.5503476, 0]; // UTM Test Coordinates
        const endPoint = destination;
        this.map.routes.getRoute([startPoint, endPoint], this.onRoutesLoaded);
      },
      onRoutesLoaded(routes){
        // Each step in the route will be on a single floor.
        for (let stepIndex = 0; stepIndex < routes[0].length; ++stepIndex) {
          const step = routes[0][stepIndex];
          const routeLine = new window.L.polyline(step.points,
            {
              indoorMapId: step.indoorMapId,
              indoorMapFloorId: step.indoorMapFloorId
>>>>>>> master
            });
            this.map.indoors.on("indoormapenter", this.onEnter);
            this.map.indoors.on("indoormapexit", this.onIndoorMapExited);
            this.map.indoors.on("expand", this.onIndoorMapExpanded);
            this.map.indoors.on("collapse", this.onIndoorMapCollapsed);
            this.$refs.search.loadSearchbar(this.map);
            this.$refs.scroll.loadScrollbar(this.map);

        },
        computed: mapGetters({
            // Only re-evaluate when its reactive dependencies are changed
            routeLinesLength: 'getRouteLinesLength',
            routeLinesRoutes: 'getRouteLinesRoutes'
        }),
        methods: {
            ...mapActions([
                'route'
            ]),
            onEnter() {
                this.map.blueSphere.setEnabled(true);
                this.map.blueSphere.setLocation(this.initialLocation);
                this.map.blueSphere.setIndoorMap("westport_house", 0);
                // this.map.setView(this.intitialLocation.reverse(), 20);
            },
            onIndoorMapExited() {
                for (let routeIndex = 0; routeIndex < this.routeLinesLength; ++routeIndex) {
                    this.map.removeLayer(this.routeLinesRoutes[routeIndex]);
                }
            },
            onIndoorMapExpanded() {
                for (let routeIndex = 0; routeIndex < this.routeLinesLength; ++routeIndex) {
                    window.L.setOptions(this.routeLinesRoutes[routeIndex], {displayOption: "currentIndoorMap"});
                }
            },
            onIndoorMapCollapsed() {
                for (let routeIndex = 0; routeIndex < this.routeLinesLength; ++routeIndex) {
                    console.log(routeIndex);
                    window.L.setOptions(this.routeLinesRoutes[routeIndex], {displayOption: "currentFloor"});
                }
            },
            exitIndoors() {
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
