<template>
    
    <div id="indoor-control-widget-container"></div>
  
            <!--<div id="aa"></div>-->
</template>
 
<script>
export default {
    name: 'scroll-bar',
    methods: {
        loadScrollbar(map) {
            this.map = map;
            var indoorControl = new window.WrldIndoorControl("widget-container", this.map);
            return indoorControl;
        },
    },
}
</script>

<style>

/* s {
    position: absolute; 
    right: 10px; 
    top: 10px; 
    bottom: 26px;
} */
.eegeo-indoor-control {
    padding-top: 70px;
    padding-left: 3vh;
}
</style>