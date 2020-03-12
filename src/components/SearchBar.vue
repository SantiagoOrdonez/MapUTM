<template>
    <div id="searchbar-widget-container" class="wrld-widget-container"></div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {

        name: 'search-bar',

        props: {
            route: {
                type: Function
            },
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
                        {name: "Deerfield Hall", latLng: [43.549, -79.6636]},
                        {name: "Dundee", latLng: [56.4602727, -2.9786788]}
                    ]
                },
                map: null,
                selected: false
            }
        },

        computed: mapGetters({
            // Only re-evaluate when its reactive dependencies are changed
            routeLinesLength: 'getRouteLinesLength',
            routeLinesRoutes: 'getRouteLinesRoutes'
        }),

        methods: {

            ...mapActions([
                'removeRoute',
                'route'
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
                if (!this.selected) {
                    // TODO set 2D top view when routing
                    this.selected = true;
                    this.removeRoute(this.map);
                    this.map.indoors.setFloor(event.result.data.floor_id);
                    this.map.setView(event.result.location.latLng, 20);
                    this.route({map: this.map, destination: [event.result.data.lon, event.result.data.lat, event.result.data.floor_id]});
                }
            },

            /**
             * Clears any search results.
             */
            onResultsClear() {
                this.selected = false;
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
