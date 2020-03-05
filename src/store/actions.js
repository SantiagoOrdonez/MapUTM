export default {
    route({commit}, {map, destination}) {
        const startPoint = [-2.978629, 56.46024, 0]; // Hardcoded Dundee Coordinates
        const endPoint = destination;

        function onRoutesLoaded(routes) {
            let routeLines = [];
            for (let stepIndex = 0; stepIndex < routes[0].length; ++stepIndex) {
                const step = routes[0][stepIndex];
                const routeLine = new window.L.polyline(step.points,
                    {
                        indoorMapId: step.indoorMapId,
                        indoorMapFloorId: step.indoorMapFloorId
                    });
                routeLine.addTo(map); //
                routeLines.push(routeLine);
            }
            commit('updateRoutes', routeLines);
        }
        map.routes.getRoute([startPoint, endPoint], onRoutesLoaded);
    },
    removeRoute({commit}, map) {
        for (let routeIndex = 0; routeIndex < this.routeLinesLength; ++routeIndex) {
            map.removeLayer(this.routeLinesRoutes[routeIndex]);
        }
        commit('updateRoutes', []);
    }
};
