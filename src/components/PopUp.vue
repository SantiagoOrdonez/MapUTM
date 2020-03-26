<template>
    <div id="pop-up-container" class="pop-up-container">
        <button class="pop-up" v-on:click="toggleView">{{this.mapViewText}}</button>
    </div>
</template>
 
<script>

export default {
    name: 'pop-up',
    props: {
        map: null
    },
    data() {
        return {
            isTopDown: false,
            mapViewText: "What floor are you on?"
        }
    },
    methods: {
        tiltMap(headingDegrees, tiltDegrees) {
            // this.map.setCameraHeadingDegrees(headingDegrees).setCameraTiltDegrees(tiltDegrees);
            
        },
        toggleView() {
            // this.isTopDown ? this.tiltMap(45,45) : this.tiltMap(45, 0);
            // this.isTopDown = !this.isTopDown;
            // this.mapViewText = this.isTopDown ? '3D' : '2D';
        }
    },
}
</script>

<style>

.pop-up-container {
    position:absolute;
    top: calc(50vh - 62px);
    left: calc(50vw - 100px);
    transition:right 500ms;
    box-shadow:0 2px 4px 2px rgba(0,0,0,0.5);
    z-index:100;
    width:200px;
    height:124px
}
 
.pop-up{
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
 
.pop-up:hover{
    color:#000060
}

</style>