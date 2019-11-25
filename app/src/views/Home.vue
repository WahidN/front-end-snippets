<template>
  <div class="snippets__wrap">
    <SnippetBox
      v-for="(snippet, i) in GET_SNIPPETS"
      :snippet="snippet"
      :showControls="false"
      :key="i"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    SnippetBox: () => import("../components/SnippetBox.vue")
  },
  computed: mapGetters(["GET_SNIPPETS"]),
  methods: {
    ...mapActions(["fetchSnippets"])
  },
  created() {
    this.fetchSnippets();
  }
};
</script>

<style lang="scss" scoped>
.content__wrap {
  position: relative;
}

.snippets__wrap {
  display: flex;
  flex-wrap: wrap;
}
</style>
