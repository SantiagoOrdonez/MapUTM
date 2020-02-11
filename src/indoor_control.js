require('wrld.js')

const { WrldIndoorControl } = window;

console.log(WrldIndoorControl)

export function onLoadScrollbar (map) {
    var indoorControl = new WrldIndoorControl("widget-container", map);
    return indoorControl;
}