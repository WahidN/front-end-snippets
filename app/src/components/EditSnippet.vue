<template>
  <div class="modal is-active">
    <div class="modal-background" v-on:click="closeModal"></div>
    <div class="modal-content">
      <div class="box">
        <SnippetForm
          :snippetId="snippetId"
          :buttonLabel="'Save'"
          :isEditing="true"
          @snippetSaved="closeModal"
        />
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" v-on:click="closeModal"></button>
  </div>
</template>

<script>
import SnippetForm from "./SnippetForm";

export default {
  data() {
    return {
      loading: true
    };
  },
  props: {
    snippetId: String
  },
  components: {
    SnippetForm
  },
  methods: {
    closeModal() {
      this.$emit("closeSnippet");
    }
  },
  mounted() {
    window.addEventListener("keydown", e => {
      if (e.keyCode === 27) {
        this.closeModal();
      }
    });
  }
};
</script>

<style>
</style>