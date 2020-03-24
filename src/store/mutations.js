export default {
    updateRoutes(state, routeLines) {
        state.routeLines = [...routeLines];
    },

    updateRouting(state, isRouting) {
        console.log("Updated boolean to " + isRouting);
        state.routing = isRouting;
    }
};
