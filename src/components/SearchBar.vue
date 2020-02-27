<template>
  <div id="searchbar-widget-container" style="position: relative; top: 55px" class="wrld-widget-container"></div>
</template>
 
<script>
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
                    {name: "Deerfield Hall", latLng: [43.549, -79.6636]}
                ]
            },
            map: null
        }
    },
    methods: {
        loadSearchbar(map) {
            this.map = map;
            const searchbar = new window.WrldSearchbar("searchbar-widget-container", this.map, this.searchbarConfig);

            searchbar.on("searchresultselect", this.onResultSelect);
            searchbar.on("searchresultsclear", this.clearHighlights);
        },
        onResultSelect(event) {
            this.map.setView(event.result.location.latLng, 20); 
            this.highlightResult(event.result);
            this.route([event.result.data.lon, event.result.data.lat, event.result.data.floor_id]);
        },

        highlightResult(result) {
            this.clearHighlights();
        },
        clearHighlights() {
            this.map.indoors.clearEntityHighlights();
        }
    },
}
</script>

<style>

</style>