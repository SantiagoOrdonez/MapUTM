<template>
    <div id="map-view-button-container" class="map-view-button-container">
        <button class="map-view-button" v-on:click="updateView">{{this.getMapViewText}}</button>
    
    </div>
</template>
 
<script>
import {mapGetters, mapActions} from "vuex";
export default {
    name: 'map-view-button',
    props: {
        map: null
    },
    computed: mapGetters({
                getMapViewText: "getMapViewText",
                getIsTopDown: "getIsTopDown"
    }),
    methods: {
        ...mapActions([
            "updateIsTopDown"
            ]),
        updateView(){
            this.updateIsTopDown();
            this.getIsTopDown ? this.map.setCameraHeadingDegrees(45).setCameraTiltDegrees(0) : this.map.setCameraHeadingDegrees(45).setCameraTiltDegrees(45);
        }
    },
}
</script>

<style>

.map-view-button-container {
    position:absolute;
    right:calc(32px * 2 + 10px * 3);
    top:95px;
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