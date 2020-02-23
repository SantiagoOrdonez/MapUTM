require('wrld.js')

const { WrldIndoorControl } = window;

export function initialCameraZoom (map) {
    setTimeout(
        function() {
            // zooms in on a very precise area
            /* TODO: get precise coordinates of DH
            */
            var bounds = L.latLngBounds([43.54, -79.66], [43.54, -79.66]);
            map.fitBounds(bounds);
        }, 
        
        8000
    );
}