<template>
  <div class="select">
    <select :value="value" @input="$emit('input', $event.target.value)">
      <option v-for="option in options" :value="option.value" :key="option.Id">{{option.name}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array
    },

    defaultSelected: {
      type: String
    }
  },
  data() {
    return {
      value: this.defaultSelected
    };
  }
};
</script>

<style>
</style>