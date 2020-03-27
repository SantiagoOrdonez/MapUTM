export default {
    updateRoutes(state, routeLines) {
        state.routeLines = [...routeLines];
    },

    updateRouting(state, isRouting) {
        state.routing = isRouting;
    },
    
    setIsTopDown(state, {isTopDown, mapViewText}){
        state.isTopDown = isTopDown;
        state.mapViewText = mapViewText;
    }
};
