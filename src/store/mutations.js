export default {
    updateRoutes(state, routeLines) {
        state.routeLines = [...routeLines];
    },

    updateRouting(state, isRouting) {
        state.routing = isRouting;
    }
};
