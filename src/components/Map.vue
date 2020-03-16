<template>
    <div id="app">
        <search-bar ref="search"></search-bar>
        <scroll-bar ref="scroll"></scroll-bar>
        <map-view-button :map="this.map"></map-view-button>
        <div id="map" style="height: 100vh"></div>
    </div>
</template>

<script>
    import SearchBar from "./SearchBar"
    import ScrollBar from "./ScrollBar"
    import MapViewButton from "./MapViewButton"
    import {mapGetters} from "vuex";

    const wrld = require("wrld.js");

    export default {
        
        name: 'app',
        
        components: {
            SearchBar,
            ScrollBar,
            MapViewButton,
        },

        data() {
            return {
                msg: 'MapUTM',
                map: null,
                initialLocation: [56.4602727, -2.9786788], // Dundee, UK 
                // initialLocation: [43.549, -79.6636] // UTM
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
                coverageTreeManifest: "https://webgl-cdn1.wrld3d.com/chunk/indoor_maps/api_requests/EIM-c3eb2f77-20e3-4b6b-bb11-784ced915fa0_2020_03_04_02_06_16/webgl_manifest.bin.gz",
                height: 500
            });
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
            onIndoorMapExited() {
              this.removeRoute(this.map);
              this.map.indoors.exit();
            },
            
            /**
             * Transition to an expanded view of the indoor map, showing all floors.
             */
            onIndoorMapExpanded() {
                for (let routeIndex = 0; routeIndex < this.routeLinesLength; ++routeIndex) {
                    window.L.setOptions(this.routeLinesRoutes[routeIndex], {displayOption: "currentIndoorMap"});
                }
            },

            /**
             * When expanded, transition back to the normal, collapsed view of an indoor map.
             */
            onIndoorMapCollapsed() {
                for (let routeIndex = 0; routeIndex < this.routeLinesLength; ++routeIndex) {
                    window.L.setOptions(this.routeLinesRoutes[routeIndex], {displayOption: "currentFloor"});
                }
			}
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 0px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 0px;
    }

    a {
        color: #42b983;
    }

    #map {
        width: 100%;
        height: 100%;
        border: 4px solid black;
    }
</style>
