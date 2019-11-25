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
export default {
  components: {
    Nav
  }
};
</script>

<style>
</style>