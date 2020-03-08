export default {

    /**
     * 
     * @param {*} state 
     * @param {*} routeLines 
     */
    updateRoutes(state, routeLines) {
        state.routeLines = [...routeLines];
    }
};
