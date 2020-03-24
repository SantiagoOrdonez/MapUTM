export default {
    
    /**
     * Creates routes for the user, with reference to a starting point in the building.
     * @param {*} param0 
     * @param {*} param1 
     */
    route({commit}, {map, destination}) {
        const startPoint = [-79.6663313, 43.5504158, 1]; // First Floor of UTM
        // const startPoint = [-2.978629, 56.46024, 0]; // Hardcoded Dundee Coordinates
        const endPoint = destination;
        endPoint[2] += 1; // Z-Index Order counts from 0

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
        console.log("Removing Route");
        var length = getters.getRouteLinesLength;
        var routeLines = getters.getRouteLinesRoutes;
        for (let routeIndex = 0; routeIndex < length; routeIndex++) {
            map.removeLayer(routeLines[routeIndex]);
        }
        
        commit('updateRoutes', []);
        commit('updateRouting', false);
    },

    setRouting({commit}, value) {
        commit('updateRouting', value);
    }
};
