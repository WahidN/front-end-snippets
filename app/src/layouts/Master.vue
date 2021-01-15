<template>
  <div>
    <Nav />
    <div class="content__wrap">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Nav from "./partials/Nav.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Nav
  },
  computed: {
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    ...mapActions(["getFavSnippets"])
  },
  beforeUpdate() {
    if (this.isAuthenticated) {
      this.getFavSnippets();
    }
  }
};
</script>
