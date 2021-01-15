<template>
  <div>
    <h1>My snippets</h1>
    <div class="snippets__wrap">
      <SnippetBox
        v-for="snippet in getFavSnippets"
        :snippet="snippet"
        :showControls="true"
        :key="snippet.Id"
        @clickedSnippet="showSnippetDetail"
        @editSnippet="editSnippetDetail"
      />
    </div>
    <SnippetModal
      v-if="showSnippet"
      :snippetId="snippetId"
      @closeSnippet="hideSnippetDetail"
    />
    <EditSnippet
      v-if="editSnippet"
      :snippetId="snippetId"
      @closeSnippet="hideSnippetDetail"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      snippetId: null,
      showSnippet: false,
      editSnippet: false,
    };
  },
  components: {
    SnippetBox: () => import("../components/SnippetBox.vue"),
    SnippetModal: () => import("../components/SnippetModal.vue"),
    EditSnippet: () => import("../components/EditSnippet.vue"),
  },
  computed: {
    ...mapGetters(["FAV_SNIPPETS", "ALL_SNIPPETS"]),
    getFavSnippets: function () {
      return this.ALL_SNIPPETS.filter(s => this.FAV_SNIPPETS.includes(s._id));
    }
  },
  methods: {
    ...mapActions(["fetchSnippets"]),
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
    this.fetchSnippets({ skip: 0, take: 100 });
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