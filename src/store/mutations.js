export default {

    /**
     * 
     * @param {*} state 
     * @param {*} routeLines 
     */
    updateRoutes(state, routeLines) {
        state.routeLines = [...routeLines];
    },
    setIsTopDown(state, {isTopDown, mapViewText}){
        state.isTopDown = isTopDown;
        state.mapViewText = mapViewText;
    }
};
