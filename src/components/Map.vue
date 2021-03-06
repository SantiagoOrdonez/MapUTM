<template>
    <div id="app">
        <search-bar ref="search" :markerController="this.markerController"></search-bar>
        <scroll-bar ref="scroll"></scroll-bar>
        <map-view-button :map="this.map"></map-view-button>
        <div id="map" style="height: 96vh"></div>
    </div>
</template>

<script>
    import SearchBar from "./SearchBar";
    import ScrollBar from "./ScrollBar";
    import MapViewButton from "./MapViewButton";
    import {mapActions, mapGetters, mapMutations} from "vuex";

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
                initialLocation: [43.549, -79.6636], // UTM
                markerController: null
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
                height: 500,

            });
            this.markerController = new window.WrldMarkerController(this.map, {poiViewsEnabled: true});

            this.map.indoors.on("indoormapexit", this.onIndoorMapExited);
            this.map.indoors.on("expand", this.onIndoorMapExpanded);
            this.map.indoors.on("collapse", this.onIndoorMapCollapsed);
            this.map.indoors.on("indoormapfloorchange", this.onIndoorMapFloorChange);
            this.$refs.search.loadSearchbar(this.map);
            this.$refs.scroll.loadScrollbar(this.map);
            this.map.setCameraHeadingDegrees(0).setCameraTiltDegrees(0);
        },

        computed: mapGetters({
            // Only re-evaluate when its reactive dependencies are changed
            routeLinesLength: 'getRouteLinesLength',
            routeLinesRoutes: 'getRouteLinesRoutes',
            isRouting: 'isRouting',
            isTopDown: 'getIsTopDown'
        }),

        methods: {

            ...mapActions([
                "setRouting",
                "removeRoute",
                "updateIsTopDown",
                "tiltMap"]),

            ...mapMutations([
                "updateRouting"
            ]),

            onIndoorMapExited() {
                if (this.isRouting) {
                    this.updateRouting(false);
                    this.removeRoute(this.map);
                }
                this.map.indoors.exit();
                this.markerController.removeAllMarkers();
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
            },

            /**
             * When floor changes, alter the tilt of the camera according to the current isTopDown state
             */
            onIndoorMapFloorChange() {
                if (this.isTopDown) {
                    setTimeout(() => this.map.setCameraHeadingDegrees(45).setCameraTiltDegrees(0), 100);
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 0px;
    }

    ul {
        list-style-type: none;
        padding: 0px;
    }

    li {
        display: inline-block;
        margin: 0px;
    }

    a {
        color: #42b983;
    }

    #map {
        width: 100%;
        height: 100%;
    }
</style>
