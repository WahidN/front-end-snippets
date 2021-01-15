<template>
  <div>
    <h1>My snippets</h1>
    <div class="snippets__wrap">
      <SnippetBox
        v-for="snippet in USER_SNIPPETS"
        :snippet="snippet"
        :showControls="true"
        :key="snippet.Id"
        @clickedSnippet="showSnippetDetail"
        @editSnippet="editSnippetDetail"
      />
    </div>
    <SnippetModal v-if="showSnippet" :snippetId="snippetId" @closeSnippet="hideSnippetDetail" />
    <EditSnippet v-if="editSnippet" :snippetId="snippetId" @closeSnippet="hideSnippetDetail" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      snippetId: null,
      showSnippet: false,
      editSnippet: false
    };
  },
  components: {
    SnippetBox: () => import("../components/SnippetBox.vue"),
    SnippetModal: () => import("../components/SnippetModal.vue"),
    EditSnippet: () => import("../components/EditSnippet.vue")
  },
  computed: mapGetters(["USER_SNIPPETS"]),
  methods: {
    ...mapActions(["fetchUserSnippets"]),
    showSnippetDetail(id) {
      this.snippetId = id;
      this.showSnippet = true;
    },
    editSnippetDetail(id) {
      this.snippetId = id;
      this.editSnippet = true;
    },
    hideSnippetDetail() {
      this.snippetId = null;
      this.showSnippet = false;
      this.editSnippet = false;
      this.fetchUserSnippets();
    }
  },
  created() {
    this.fetchUserSnippets({ skip: 0, take: 100 });
  }
};
</script>

<style lang="scss" scoped>
.snippets__wrap {
  display: flex;
  flex-wrap: wrap;
  margin-top: $space-4;
}
</style>
