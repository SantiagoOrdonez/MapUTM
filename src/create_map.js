require('wrld.js')

export function createMap () {
    var map = L.Wrld.map("map", "5378c39112e718bdeb6f19df0168d1cf", {
        center: [43.549, -79.6636],
        zoom: 15,
        trafficEnabled: false,
        frameRateThrottleWhenIdleEnabled: true,
        throttledTargetFrameIntervalMilliseconds: 500,
        idleSecondsBeforeFrameRateThrottle: 15.0,
        indoorsEnabled: true,
        coverageTreeManifest: "https://webgl-cdn1.wrld3d.com/chunk/indoor_maps/api_requests/EIM-c3eb2f77-20e3-4b6b-bb11-784ced915fa0_2020_02_09_05_33_40/webgl_manifest.bin.gz"
    });

    return map;
}