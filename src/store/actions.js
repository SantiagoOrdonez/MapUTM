export default {
    
    /**
     * Creates routes for the user, with reference to a starting point in the building.
     * @param {*} param0 
     * @param {*} param1 
     */
    route({commit}, {map, destination}) {
        const startPoint = [-2.978629, 56.46024, 0]; // Hardcoded Dundee Coordinates
        const endPoint = destination;

        /**
         * 
         * @param {object} routes 
         */
        function onRoutesLoaded(routes) {

            let routeLines = [];
            for (let stepIndex = 0; stepIndex < routes[0].length; ++stepIndex) {
                const step = routes[0][stepIndex];
                const routeLine = new window.L.polyline(step.points,
                    {
                        indoorMapId: step.indoorMapId,
                        indoorMapFloorId: step.indoorMapFloorId,
                        weight: 5,
                        color: '#FFFF00',
                    });
                routeLine.addTo(map);
                routeLines.push(routeLine);
            }

            commit('updateRoutes', routeLines);
        }

        map.routes.getRoute([startPoint, endPoint], onRoutesLoaded);
    },

    /**
     * Removes all visible routes on the screen.
     * @param {*} param0 
     * @param {L.Wrld.map} map 
     */
    removeRoute({commit, getters}, map) {
        var length = getters.getRouteLinesLength;
        var routeLines = getters.getRouteLinesRoutes;
        for (let routeIndex = 0; routeIndex < length; routeIndex++) {
            map.removeLayer(routeLines[routeIndex]);
        }
        
        commit('updateRoutes', []);
    },
    updateIsTopDown({commit, getters}) {
        commit('setIsTopDown', {isTopDown: !getters.getIsTopDown,
                                 mapViewText: !getters.getIsTopDown ? '3D' : '2D'});
    }
};
