import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

const state = {
    routeLines: [],
    routing: false,
    isTopDown: false,
    startLocation: [],
    destinationLocation: [],
    src: [],
    mapViewText: "2D"
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});
