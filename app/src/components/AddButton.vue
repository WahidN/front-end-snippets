<template>
  <button v-on:click="navigate" class="btn--add" v-bind:class="{ active: togglePath }">
    <svg height="35" viewBox="0 0 448 448" width="35" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: "AddButton",
  props: ["route"],
  data() {
    return {
      togglePath: true
    };
  },
  methods: {
    navigate() {}
  }
};
</script>

<style lang="scss" scoped>
.btn--add {
  border-radius: 50%;
  border: none;
  background-color: black;
  width: 75px;
  height: 75px;
  position: fixed;
  right: 5%;
  bottom: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: white;
    transform-origin: 50% 50%;
    transition: transform 0.4s ease-in-out;
  }

  &.active {
    svg {
      transform: rotate(45deg);
      transition: transform 0.4s ease-in-out;
    }
  }
}
</style>