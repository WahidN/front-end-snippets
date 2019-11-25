<template>
  <div class="snippets__wrap">
    <SnippetBox
      v-for="snippet in USER_SNIPPETS"
      :snippet="snippet"
      :showControls="true"
      :key="snippet.Id"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    SnippetBox: () => import("../components/SnippetBox.vue")
  },
  computed: mapGetters(["USER_SNIPPETS"]),
  methods: {
    ...mapActions(["fetchUserSnippets"])
  },
  created() {
    this.fetchUserSnippets();
  }
};
</script>

<style lang="scss" scoped>
.snippets__wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>