<template>
    <div @click="this.emit('close')" id="hover-background" class="hover-background">
        <div id="pop-up-container" class="pop-up-container">
            <h3 class="pop-up-heading">What floor are you on?</h3>

            <label class="container">Floor One
                <input type="radio" checked="checked" name="radio" value="1">
                <span class="checkmark"></span>
            </label>

            <label class="container">Floor Two
                <input type="radio" name="radio" value="2">
                <span class="checkmark"></span>
            </label>

            <label class="container">Floor Three
                <input type="radio" name="radio" value="3">
                <span class="checkmark"></span>
            </label>

            <label class="container">Floor Four
                <input type="radio" name="radio" value="4">
                <span class="checkmark"></span>
            </label>

            <button @click="exitPopUp" class="okButton">Route</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'pop-up',
        data() {
            return {
                hasSelected: false,
                selected: 1,
            }
        },

        methods: {
            exitPopUp() {
                this.hasSelected = true;
                document.getElementById("pop-up-container").style.display = "none";
                document.getElementById("hover-background").style.display = "none";
            },

            loadPopUp() {
                this.hasSelected = false;
                document.getElementById("hover-background").style.display = "block";
                document.getElementById("pop-up-container").style.display = "block";
            },

            getValue() {
                const ele = document.getElementsByName("radio");

                for(let i = 0; i<ele.length; i++) {
                    if(ele[i].checked) {
                        this.selected = ele[i].value;
                    }
                }
                //console.log(this.selected);
                //return new Promise(this.hasSelected);
            }

        },
    };
</script>

<style>

.hover-background {
    display: none;
    background:rgba(0,0,0,.4);
    cursor:pointer;
    height:100%;
    position:fixed;
    top:0;
    width:100%;
    z-index:10000;
}

.pop-up-heading {
    margin-top: 0;
}

.pop-up-container {
    display: none;
    background-color:#fff;
    border-radius: 8px;
    box-shadow: 10px 10px 60px #000;
    position: absolute;
    padding: 30px;

    width: 210px;
    height: 236px;

    left: calc(50vw - 105px - 30px);
    top: calc(50vh - 119px - 30px);
    
    z-index: 100;
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
 
.pop-up:hover{
    color:#000060
}

.okButton {
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

.exitButton {
    background-color: #edebe9;
    border: none;
    color: black;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    border-radius: 50%;
}
</style>

