<template>
    <div id="eegeo-tilt-button-container" class="eegeo-tilt-button-container">
        <button class="eegeo-ripple-button eegeo-tilt-button" v-on:click="toggleView">{{this.mapViewText}}</button>
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

.eegeo-tilt-button-container {
    position:absolute;
    right:calc(32px * 2 + 10px * 3);
    top:95px;
    transition:right 500ms;
    box-shadow:0 2px 4px 2px rgba(0,0,0,0.5);
    z-index:100;
    width:44px;
    height:44px
}
 
.eegeo-tilt-button{
    width:inherit;
    height:inherit;
    font-family:"Open Sans", sans-serif;
    font-size:16pt;
    color:#606060;
    font-weight:600
}
 
.eegeo-tilt-button:hover{
    color:#000060
}

</style>