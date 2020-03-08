export default {
    updateRoutes(state, routeLines) {
        console.log(routeLines);
        state.routeLines = [...routeLines];
    }
};
