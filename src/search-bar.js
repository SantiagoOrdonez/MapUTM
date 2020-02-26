
var wrldMap;
var searchbar;
var markerController;
var searchbarConfig = {
	apiKey: "5378c39112e718bdeb6f19df0168d1cf",
	skipYelpSearch: true,
	overrideIndoorSearchMenuItems: true,
	outdoorSearchMenuItems: [
		{name: "Around Me", searchTag: "", iconKey: "aroundme"},
	],
	locationJumps: [
		{name: "Deerfield Hall", latLng: [43.549, -79.6636]}
	]
};

export function loadSearchbar (map) {
	wrldMap=map;
	searchbar = new WrldSearchbar("searchbar-widget-container", map, searchbarConfig);

	markerController = new WrldMarkerController(map, {
		searchbar: searchbar,
	});


	searchbar.on("searchresultselect", onResultSelect);
	searchbar.on("searchresultsclear", clearHighlights);
	
	// Marker Controller will be used for highlighting functionality

	// markerController.on("searchresultaddmaker", onMarkerAddFromSearchResult);
	// return searchbar;
}

function onResultSelect(event) {
  // markerController.openPoiView(event.result.sourceId);
  wrldMap.setView(event.result.location.latLng, 20); 
  highlightResult(event.result);
}


function onMarkerAddFromSearchResult(event) {
	event.marker.on("click", highlightResult.bind(hightlightResult, event.result));
}

function highlightResult(result) {
	clearHighlights();
    // wrldMap.indoors.setEntityHighlights(result.data.user_data.highlight, result.data.user_data.highlight_color);
    // wrldMap.indoors.setEntityHighlights(["1353","DH1070"], [0, 0, 255, 128]);
}

function clearHighlights() {
	wrldMap.indoors.clearEntityHighlights();
}