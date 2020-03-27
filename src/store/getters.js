export default {
    getRouteLinesLength: state => {
        return state.routeLines.length;
    },

    getRouteLinesRoutes: state => {
        return state.routeLines;
    },

    isRouting: state => {
        return state.routing;
    },

    getIsTopDown: state => {
        return state.isTopDown;
    },

    getMapViewText: state => {
        return state.mapViewText;
    }
}
