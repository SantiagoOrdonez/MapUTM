<template>
    <div id="searchbar-widget-container" class="wrld-widget-container"></div>
</template>

<script>
    import {mapActions} from "vuex";
    import {mapGetters} from "vuex";

    export default {
        name: 'search-bar',
        data() {
            return {
                searchbarConfig: {
                    apiKey: "5378c39112e718bdeb6f19df0168d1cf",
                    skipYelpSearch: true,
                    overrideIndoorSearchMenuItems: true,
                    outdoorSearchMenuItems: [
                        {name: "Around Me", searchTag: "", iconKey: "aroundme"},
                    ],
                    locationJumps: [
                        {name: "Deerfield Hall", latLng: [43.549, -79.6636]},
                        {name: "Dundee", latLng: [56.4602727, -2.9786788]}
                    ]
                },
                map: null,
            }
        },

        computed: mapGetters({
            // Only re-evaluate when its reactive dependencies are changed
            isRouting: 'routing'
        }),

        methods: {
            ...mapActions([
                'removeRoute',
                'getRouting',
                'setRouting'
            ]),

            /**
             * Loads the searchbar.
             * @param {L.Wrld.map} map
             */
            loadSearchbar(map) {
                this.map = map;
                const searchbar = new window.WrldSearchbar("searchbar-widget-container", this.map, this.searchbarConfig);
                searchbar.on("searchresultselect", this.onResultSelect);
                searchbar.on("searchresultsclear", this.onResultsClear);
            },

            /**
             * Data for the Place selected by the user.
             * @param {Event} event
             */
            onResultSelect(event) {

                ///////////////////////////////////////////////////////
                console.log("searchbar this.isrouting1", this.$store.dispatch('getRouting'));

                if (this.$store.dispatch('getRouting') == true) {
                    return null;
                }

                // this.isRouting = true;
                
                this.removeRoute(this.map);

                this.$store.dispatch('setRouting', {value: true});

                console.log("searchbar this.isrouting2", this.$store.dispatch('getRouting'));

                this.map.indoors.setFloor(event.result.data.floor_id);

                this.map.setView(event.result.location.latLng, 20);
                //////////////////////////////////////////////////////////

                // const markerController = new window.WrldMarkerController(this.map, { poiViewsEnabled: true });
                // const markerInfo = {
                //     poiView: { 
                //         title: "You are on floor " + 0 + ". Your room is on floor " + event.result.data.floor_id + ".",
                //     },
                //     floorIndex: 0,
                // }

                // markerController.addMarker(1, [56.4602727, -2.9786788], markerInfo);
                // markerController.showMarker(1);
                // setTimeout(function () {
                //     markerController.openPoiCard(1);},
                //     500);
                // setTimeout(function () {
                //     markerController.closePoiCard(1);},
                //     3000);

                this.$store.dispatch('route', {
                    map: this.map,
                    destination: [event.result.data.lon, event.result.data.lat, event.result.data.floor_id]
                })
                
                // .then((response) => {
                //     console.log(response);
                // })
            },

            /**
             * Clears any search results.
             */
            onResultsClear() {
                //////////////////////////////////////////////////////////
                this.$store.dispatch('setRouting', {value: false});
                this.removeRoute(this.map);
                //////////////////////////////////////////////////////////
            }
        },
    };
</script>

<style>
    #searchbar-widget-container {
        top: 20px;
        left: 20px;
        height: 90vh;
    }
</style>
