
<!-- TODO 
 
- Add padding for the indoor scrollbar.
- Investigate initial camera zoom on individual buildings.
- Realign all the floors of Deerfield Hall
- Find out what each CSS stle does
- Move css styles to another file

END OF TODO -->

<template>
    <div id="app">
        <div id="widget-container" class="wrld-widget-container"></div>

        <div id="map" style="height: 96vh;"></div>
        
        <link href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css" rel="stylesheet" />

        <link href="https://cdn-webgl.wrld3d.com/wrldjs/addons/resources/latest/css/wrld.css" rel="stylesheet"/>
    </div>
</template>

<script>

/* All imports and requirements go here. */

import { onLoadScrollbar }  from './indoor_control';
import { createMap }  from './create_map';

const Wrld = require("wrld.js");

/* All Javascript functions go in mounted. */

export default {
    name: 'app',
    mounted() {
        var map = createMap();
        onLoadScrollbar(map);
    },
  
    data () {
        return {
            msg: ''
        }
    },
}
</script>

<!-- All CSS styles # this is a SINGLE FILE COMPONENT. -->

<style>
.eegeo-indoor-control {
    padding-top: 3vh;
    padding-left: 3vh;
}

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
    margin: 10px;
}

a {
    color: #033267;
}
</style>