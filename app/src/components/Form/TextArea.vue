<template>
  <div class="field">
    <label class="label">{{label}}</label>
    <div class="control">
      <textarea
        class="textarea"
        v-bind:rows="rows"
        v-bind:class="{ 'is-danger': hasError }"
        v-bind:placeholder="placeholder"
        v-bind:id="id"
        :value="value"
        @input="handleInput($event.target.value)"
      ></textarea>
    </div>
    <p v-if="hasError" class="help is-danger">{{errorMessage}}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    hasIcon: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    value: {
      type: String
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String
    },
    rows: {
      type: Number
    }
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style>
</style>