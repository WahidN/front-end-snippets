<template>
  <div class="control">
    <button class="button" v-bind:type="btnType" v-bind:class="classes">{{label}}</button>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    btnType: {
      type: String
    },
    classes: {
      type: Array
    }
  }
};
</script>

<style>
</style>