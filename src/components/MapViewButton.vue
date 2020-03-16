<template>
    <div id="map-view-button-container" class="map-view-button-container">
        <button class="map-view-button" v-on:click="toggleView">{{this.mapViewText}}</button>
    </div>
</template>
 
<script>

export default {
    name: 'map-view-button',
    props: {
        map: null
    },
    data() {
        return {
            isTopDown: false,
            mapViewText: "2D"
        }
    },
    methods: {
        tiltMap(headingDegrees, tiltDegrees) {
            this.map.setCameraHeadingDegrees(headingDegrees).setCameraTiltDegrees(tiltDegrees);
        },
        toggleView() {
            this.isTopDown ? this.tiltMap(45,45) : this.tiltMap(45, 0);
            this.isTopDown = !this.isTopDown;
            this.mapViewText = this.isTopDown ? '3D' : '2D';
        }

    },
}
</script>

<style>

.map-view-button-container {
    position:absolute;
    right:62px;
    top:20px;
    transition:right 500ms;
    box-shadow:0 2px 4px 2px rgba(0,0,0,0.5);
    z-index:100;
    width:32px;
    height:32px
}
 
.map-view-button{
    background-color: #fff;
    background-position: center;
    background-repeat: no-repeat;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    padding: 0;
    position: relative;
    width: inherit;
    height: inherit;
    font-family: "Open Sans", sans-serif;
    font-size: 13pt;
    color: #606060;
    font-weight: 600;
}
 
.map-view-button:hover{
    color:#000060
}

</style>