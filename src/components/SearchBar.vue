<template>
    <div id="searchbar-widget-container" class="wrld-widget-container"></div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";

    export default {
        
        ...mapActions([
            'route',
            'removeRoute'
        ]),

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
                selected: false
            }
        },

        computed: mapGetters({
            // Only re-evaluate when its reactive dependencies are changed
            routeLinesLength: 'getRouteLinesLength',
            routeLinesRoutes: 'getRouteLinesRoutes'
        }),

        methods: {

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
            async onResultSelect(event) {
                console.log(this.$store.state.routeLines.length == 0)

                if (this.$store.state.routeLines.length == 0) return
                
                this.map.indoors.setFloor(event.result.data.floor_id);
                this.map.setView(event.result.location.latLng, 20);
                                    
                await this.$store.dispatch('route', {
                    map: this.map,
                    destination: [event.result.data.lon, event.result.data.lat, event.result.data.floor_id]
                })
            },

            /**
             * Clears any search results.
             */
            async onResultsClear() {
                this.selected = false;
                
                await this.$store.dispatch('removeRoute', this.map);
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
