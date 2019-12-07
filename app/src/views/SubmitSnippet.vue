<template>
  <div class="card submit-card">
    <div class="card__header">
      <h1>Submit snippet</h1>
    </div>
    <div class="card__body">
      <SnippetForm :buttonLabel="'Submit'" :isEditing="false" />
    </div>
  </div>
</template>

<script>
import SnippetForm from "../components/SnippetForm";

export default {
  components: {
    SnippetForm
  }
};
</script>

<style lang="scss" scoped>
.submit-card {
  max-width: 800px;
  margin: 0 auto;
  .card__header {
    justify-content: flex-start;
  }
}
</style>
