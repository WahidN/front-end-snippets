<template>
  <div class="snippets__wrap">
    <SnippetBox
      v-for="(snippet, i) in GET_SNIPPETS"
      :snippet="snippet"
      :showControls="false"
      :key="i"
      @clickedSnippet="showSnippetDetail"
    />
    <SnippetModal v-if="showSnippet" :snippetId="snippetId" @closeSnippet="hideSnippetDetail" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      snippetId: null,
      showSnippet: false
    };
  },
  components: {
    SnippetBox: () => import("../components/SnippetBox.vue"),
    SnippetModal: () => import("../components/SnippetModal.vue")
  },
  computed: mapGetters(["GET_SNIPPETS"]),
  methods: {
    ...mapActions(["fetchSnippets"]),
    showSnippetDetail(id) {
      this.snippetId = id;
      this.showSnippet = true;
    },
    hideSnippetDetail() {
      this.snippetId = null;
      this.showSnippet = false;
    }
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
  margin-right: -20px;
}
</style>
