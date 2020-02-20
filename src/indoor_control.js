require('wrld.js')

const { WrldIndoorControl } = window;

// console.log(WrldIndoorControl)

export function onLoadScrollbar (map) {
    var indoorControl = new WrldIndoorControl("widget-container", map);
    return indoorControl;
}

export function pad () {
    var x = document.getElementById("widget-container").getAttribute("eegeo-indoor-control");
    console.log("called");
    if (x != null) {
        console.log("I DID IT")
        document.getElementById("eegeo-indoor-control").setAttribute("style", "padding: 10px;");
    }
}