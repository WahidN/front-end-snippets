import Vue from "vue";
import Vuex from "vuex";
import SnippetState from "./modules/snippets";
import Auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    SnippetState,
    Auth
  }
});
