<template>
  <div class="snippets__wrap">
    <SnippetBox
      v-for="(snippet, i) in GET_SNIPPETS"
      :snippet="snippet"
      :showControls="false"
      :key="i"
      @clickedSnippet="showSnippetDetail"
    />
    <SnippetModal
      v-if="showSnippet"
      :snippetId="snippetId"
      @closeSnippet="hideSnippetDetail"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      snippetId: null,
      showSnippet: false,
      skip: 16,
    };
  },
  components: {
    SnippetBox: () => import("../components/SnippetBox.vue"),
    SnippetModal: () => import("../components/SnippetModal.vue"),
  },
  computed: {
    ...mapGetters(["isAuthenticated", "GET_SNIPPETS", "TOTAL_SNIPPETS"]),
  },
  methods: {
    ...mapActions(["fetchSnippets"]),
    showSnippetDetail(id) {
      this.snippetId = id;
      this.showSnippet = true;
    },
    hideSnippetDetail() {
      this.snippetId = null;
      this.showSnippet = false;
    },
    debounce(func, wait = 100) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(this, args);
        }, wait);
      };
    },
    loadMore() {
      if (this.skip >= this.TOTAL_SNIPPETS) return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.fetchSnippets({ skip: this.skip, take: 16 }).then(() => {
          this.skip = this.skip + 16;
        });
      }
    },
  },
  mounted() {
    const loadDebounced = this.debounce(this.loadMore, 500);
    this.fetchSnippets({ skip: 0, take: 16 });
    window.addEventListener("scroll", loadDebounced);
  },
  destroyed() {
    window.removeEventListener("scroll", this.loadMore, true);
  },
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

  @media screen and (max-width: 680px) {
    margin-right: 0;
  }
}
</style>
