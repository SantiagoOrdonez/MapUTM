<template>
    <div>
        <div id="searchbar-widget-container" class="wrld-widget-container"></div>
        <pop-up :markerController="this.markerController" :roomLocation="this.roomLocation" :map="this.map" v-if="popUpShowing"
                @close="popUpShowing=false "></pop-up>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";
    import PopUp from './PopUp';

    export default {
        name: 'search-bar',

        components: {
            PopUp,
        },

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
                        {name: "Deerfield Hall", latLng: [43.549, -79.6636]}
                    ]
                },
                map: null,
                roomLocation: "",
                popUpShowing: false,
            }
        },
        props: {
            markerController: Object
        },

        computed: mapGetters({
            // Only re-evaluate when its reactive dependencies are changed
            isRouting: 'isRouting'
        }),

        methods: {
            ...mapActions([
                'removeRoute'
            ]),

            ...mapMutations([
                'updateRouting',
                'updateStartLocation',
                'updateDestinationLocation'
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
            //async
            onResultSelect(event) {
                if (this.map.indoors.isIndoors()) {
                    this.markerController.removeAllMarkers();
                    this.updateRouting(false);
                    this.removeRoute(this.map);
                    this.popUpShowing = true;
                    this.roomLocation = event.result['title'];
                    this.updateDestinationLocation([event.result.data.lon, event.result.data.lat, event.result.data.floor_id]);
                }
            },


            /**
             * Clears any search results.
             */
            onResultsClear() {
                this.markerController.removeAllMarkers();
                this.updateRouting(false);
                this.removeRoute(this.map);
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
