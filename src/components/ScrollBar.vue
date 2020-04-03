<template>
    <div id="scrollbar-container" class="wrld-widget-container"></div>
</template>
 
<script>
    export default {

        name: 'scroll-bar',

        methods: {
            loadScrollbar(map) {
                this.map = map;
                let indoorControl = new window.WrldIndoorControl("scrollbar-container", this.map);
                return indoorControl;
            },
        },
    }
</script>

<style>
.eegeo-indoor-control {
    top: 55px;
    right: 10px;
    float: right;
}
</style>
