require('wrld.js')

const { WrldIndoorControl } = window;

export function onLoadScrollbar (map) {
    var indoorControl = new WrldIndoorControl("widget-container", map);
    return indoorControl;
}