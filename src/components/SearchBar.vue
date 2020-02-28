<template>
  <div id="searchbar-widget-container" style="padding-top: 1vh; padding-left: 1vh" class="wrld-widget-container"></div>
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

            // const markerController = new window.WrldMarkerController(this.map, {
            //     searchbar: searchbar,
            // });

            searchbar.on("searchresultselect", this.onResultSelect);
            searchbar.on("searchresultsclear", this.clearHighlights);

            // Marker Controller will be used for highlighting functionality

            // markerController.on("searchresultaddmaker", onMarkerAddFromSearchResult);
            // return searchbar;
        },
        onResultSelect(event) {
            // markerController.openPoiView(event.result.sourceId);
            this.map.setView(event.result.location.latLng, 20); 
            this.highlightResult(event.result);
            this.route([event.result.data.lon, event.result.data.lat, event.result.data.floor_id]);
        },
        onMarkerAddFromSearchResult(event) {
            event.marker.on("click", this.highlightResult.bind(this.hightlightResult, event.result));
        },
        highlightResult(result) {
            console.log(result);
            this.clearHighlights();
            // wrldMap.indoors.setEntityHighlights(result.data.user_data.highlight, result.data.user_data.highlight_color);
            // wrldMap.indoors.setEntityHighlights(["1353","DH1070"], [0, 0, 255, 128]);
        },
        clearHighlights() {
            this.map.indoors.clearEntityHighlights();
        }
    },
}
</script>

<style>

</style>