<template>
    <div>
        <div id="hover-background" @click="exitPopUp" class="hover-background"></div>
        <div id="pop-up-container" class="pop-up-container">
            <h3 class="pop-up-heading">What floor are you on?</h3>

            <label class="container">Floor One
                <input v-model="floorPicked" type="radio" checked="checked" name="radio" value="1">
                <span class="checkmark"></span>
            </label>

            <label class="container">Floor Two - Stairs
                <input v-model="floorPicked" type="radio" name="radio" value="2">
                <span class="checkmark"></span>
            </label>

            <label class="container">Floor Two - Entrance
                <input v-model="floorPicked" type="radio" name="radio" value="2.5">
                <span class="checkmark"></span>
            </label>

            <label class="container">Floor Three
                <input v-model="floorPicked" type="radio" name="radio" value="3">
                <span class="checkmark"></span>
            </label>

            <label class="container">Floor Four
                <input v-model="floorPicked" type="radio" name="radio" value="4">
                <span class="checkmark"></span>
            </label>

            <button @click="loadRoute" class="routeButton">Route</button>
        </div>
    </div>


</template>

<script>
    import {mapGetters, mapMutations} from "vuex";

    export default {
        name: 'pop-up',

        props: {
            map: null,
            markerController: Object,
            roomLocation: String
        },

        data() {
            return {
                floorPicked: 1,
                floorLocations: {
                    "1": [-79.66602, 43.5503411, 1],
                    "2": [-79.6662331, 43.5504474, 2],
                    "2.5": [-79.6665962, 43.5505556, 2],
                    "3": [-79.6662687, 43.5504318, 3],
                    "4": [-79.6662511, 43.5504525, 4]
                },
            }
        },

        computed: mapGetters({
            // Only re-evaluate when its reactive dependencies are changed
            isRouting: 'isRouting',
            getStartLocation: 'getStartLocation',
            getDestinationLocation: 'getDestinationLocation'
        }),

        methods: {
            ...mapMutations([
                'updateRouting',
                'updateStartLocation'
            ]),
            loadRoute() {
                this.exitPopUp();

                if (this.isRouting) {
                    return;
                }

                this.updateStartLocation(this.floorLocations[this.floorPicked]);
                this.updateRouting(true);
                this.map.indoors.setFloor(this.floorLocations[this.floorPicked][2] - 1);

                this.map.setView({lat: this.getStartLocation[1], lng: this.getStartLocation[0]}, 20);

                let startingFloor = parseInt(this.floorLocations[this.floorPicked][2]);
                const startMarkerInfo = {
                    poiView: {
                        title: "You are on floor " + startingFloor + ". Your room is on floor " + (this.getDestinationLocation[2] + 1) + ".",
                    },
                    floorIndex: startingFloor - 1,
                    iconKey: 'dir_route_start',

                };
                this.markerController.addMarker(1, [this.getStartLocation[1], this.getStartLocation[0]], startMarkerInfo);
                this.markerController.showMarker(1);

                const endMarkerInfo = {
                    poiView: {
                        title: "Destination: " + this.roomLocation
                    },
                    floorIndex: this.getDestinationLocation[2],
                };
                this.markerController.addMarker(2, [this.getDestinationLocation[1], this.getDestinationLocation[0]], endMarkerInfo);
                this.markerController.showMarker(2);

                this.$store.dispatch('route', {
                    map: this.map,
                    start: this.getStartLocation,
                    destination: this.getDestinationLocation
                });
            },

            exitPopUp() {
                this.$emit('close');
            }
        },

    };
</script>

<style>

    .hover-background {
        background: rgba(0, 0, 0, .3);
        cursor: pointer;
        height: 100%;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 10000;
    }

    .pop-up-heading {
        margin-top: 0;
    }

    .pop-up-container {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 10px 10px 60px #000;
        position: absolute;
        padding: 30px;
        z-index: 10001;
        width: 210px;
        height: 280px;

        left: calc(50vw - 105px - 30px);
        top: calc(50vh - 119px - 30px);
    }

    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 20px;
        cursor: pointer;
        font-size: 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browsers default radio button */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    /* Create a custom radio button */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 16px;
        width: 16px;
        background-color: #eee;
        border-radius: 25%;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the radio button is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #2196F3;
    }

    /* Create the indicator (the dot/circle - hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the indicator (dot/circle) when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the indicator (dot/circle) */
    .container .checkmark:after {
        top: 3px;
        left: 3px;
        width: 10px;
        height: 10px;
        border-radius: 25%;
        background: white;
    }

    .pop-up:hover {
        color: #000060
    }

    .routeButton {
        background-color: #edebe9;
        border: none;
        color: black;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 4px;
    }
</style>

