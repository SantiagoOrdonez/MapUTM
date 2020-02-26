<template>
  <div>
    <button v-on:click="goUp">Up</button>
    <button v-on:click="goDown">Down</button>
    <button v-on:click="getRoute">Get Route</button>

  </div>
</template>

<script>

  export default {
    name: "Routing",
    props: "map",
    methods: {
      goUp() {
        // console.log("Going up");
        console.log(map);
        // console.log(wrld.map());
        // map.indoors.moveUp();
      },
      goDown() {
        console.log("Going down");
      },
      getRoute() {
        console.log("Getting route")
      }
      // onEnter(event){
      //   console.log("Entered indoor map: " + event.indoorMap.getIndoorMapName());
      // }
    }
  }
</script>
