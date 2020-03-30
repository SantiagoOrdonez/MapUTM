export default {
    updateRoutes(state, routeLines) {
        state.routeLines = [...routeLines];
    },

    updateRouting(state, isRouting) {
        state.routing = isRouting;
    },

    updateStartLocation(state, startLocation) {
        state.startLocation = startLocation;
    },

    updateDestinationLocation(state, destinationLocation) {
        state.destinationLocation = destinationLocation;
    },

    setIsTopDown(state, {isTopDown, mapViewText}){
        state.isTopDown = isTopDown;
        state.mapViewText = mapViewText;
    }
};