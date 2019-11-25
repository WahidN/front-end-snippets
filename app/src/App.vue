<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>

<script>
const master_layout = "master";

export default {
  computed: {
    layout() {
      return `${this.$route.meta.layout || master_layout}-layout`;
    }
  }
};
</script>

<style>
</style>
