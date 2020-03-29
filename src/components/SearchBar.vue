<template>
    <div>
        <div id="searchbar-widget-container" class="wrld-widget-container"></div>
        <pop-up :map="map" v-if="popUpShowing" @close="popUpShowing = false"></pop-up>
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
                popUpShowing: false,
            }
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
                
                this.updateRouting(false);
                this.removeRoute(this.map);
                
                /*
                click search
                pop up shows 
                select floor ()
                route (4)
                */

                // TODO: making the dispatch run after getting floor from Popup
                // So the way I attempted to implement this resulted in both the popup and the route dispatch to run at the same time
                // rendering the popup useless since the map already routed.
                this.popUpShowing = true;
                //await this.getValue();

                this.updateDestinationLocation([event.result.data.lon, event.result.data.lat, event.result.data.floor_id]);
            },


            /**
             * Clears any search results.
             */
            onResultsClear() {
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
