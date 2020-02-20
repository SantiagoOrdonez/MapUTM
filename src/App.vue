
<!-- TODO 
 
- Add padding for the indoor scrollbar.
- Investigate initial camera zoom on individual buildings.
- Realign all the floors of Deerfield Hall
- Find out what each CSS stle does
- Move css styles to another file

END OF TODO -->

<template>
    <div id="app">
      
        <!--<script src="https://cdn-webgl.wrld3d.com/wrldjs/dist/latest/wrld.js"></script>dir-->
        <!--<link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css" rel="stylesheet" />-->

        <!--<img src="./assets/UofT.png">-->

        <!-- <h1>{{ msg }}</h1> -->
        
        <div id="widget-container" class="wrld-widget-container"></div>

        <div id="map" style="height: 96vh;"></div>
        
        <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css" rel="stylesheet" />

        <link href="https://cdn-webgl.wrld3d.com/wrldjs/addons/resources/latest/css/wrld.css" rel="stylesheet"/>
        
        <!--<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
        <script src="https://cdn-webgl.wrld3d.com/wrldjs/addons/indocontrol/latest/indoor_control.js"></script>-->

        <!--<h2>Essential Links</h2>
        <ul>
          <li><a href="https://leafletjs.com/" target="_blank">Leaflet</a></li>
          <li><a href="https://www.wrld3d.com/" target="_blank">WRLD</a></li>
          <li><a href="https://www.wrld3d.com/legal" target="_blank">Partners</a></li>
        </ul>-->

    </div>
</template>

<script>

/* All imports and requirements go here */

import { initialCameraZoom }  from './initial_camera_zoom';
import { onLoadScrollbar }  from './indoor_control';
import { createMap }  from './create_map';
// import { pad }  from './indoor_control'; // # TODO in progress, adds padding to the indoor scrollbar

const Wrld = require("wrld.js");

/* All Javascript functions go in mounted */

export default {
    name: 'app',
    mounted() {
        var map = createMap();

        // initialCameraZoom(map);

        onLoadScrollbar(map);

        // pad();
    },
  
    data () {
        return {
            msg: ''
        }
    },
}
</script>

<!-- All CSS styles
-->

<style>
body {
    padding: 1vh;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #033267;
}
</style>