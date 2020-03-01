<template>
    <div id="scrollbar-container" class="wrld-widget-container"></div>
</template>
 
<script>
export default {
    name: 'scroll-bar',
    methods: {
        loadScrollbar(map) {
            this.map = map;
            var indoorControl = new window.WrldIndoorControl("scrollbar-container", this.map);
            return indoorControl;
        },
    },
}
</script>

<style>
.eegeo-indoor-control {
    padding-top: 70px;
    padding-left: 3vh;
    float: right;
}
</style>