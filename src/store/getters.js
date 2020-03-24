export default {
    getRouteLinesLength: state => {
        return state.routeLines.length;
    },

    getRouteLinesRoutes: state => {
        return state.routeLines;
    },

    isRouting: state => {
        return state.routing;
    }
}
