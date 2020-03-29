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

    getStartLocation: state => {
        return state.startLocation;
    },

    getDestinationLocation: state => {
        return state.destinationLocation;
    },
    
    getIsTopDown: state => {
        return state.isTopDown;
    },

    getMapViewText: state => {
        return state.mapViewText;
    }
}