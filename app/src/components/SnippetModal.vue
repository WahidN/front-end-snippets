<template>
  <div class="modal is-active">
    <div class="modal-background" v-on:click="closeModal"></div>
    <div class="modal-content">
      <div class="snippet__box card">
        <div class="snippet__header">
          <h1 class="snippet__title" v-if="!loading">{{ snippet.title }}</h1>
          <div class="skeleton skeleton-title" v-if="loading"></div>
          <div
            class="language-tag"
            v-if="!loading"
            v-bind:class="snippet.category"
          >{{ snippet.category }}</div>
          <div class="skeleton skeleton-tag" v-if="loading"></div>
        </div>
        <div class="snippet__body">
          <div v-if="!loading" class="snippet__description">
            <p>{{ snippet.description }}</p>
          </div>
          <div class="skeleton skeleton-description" v-if="loading"></div>

          <div v-if="!loading" class="snippet__code">
            <prism :language="snippet.category.toLowerCase()" :code="snippet.code"></prism>
          </div>
          <div class="skeleton skeleton-code" v-if="loading"></div>
        </div>
        <div class="snippet__footer">
          <div v-if="!loading" class="likes" :class="{ liked: liked }">
            <svg
              version="1.1"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 492.719 492.719"
              style="enable-background:new 0 0 492.719 492.719;"
              xml:space="preserve"
              class="heartSVG"
            >
              <path
                d="M492.719,166.008c0-73.486-59.573-133.056-133.059-133.056c-47.985,0-89.891,25.484-113.302,63.569
			c-23.408-38.085-65.332-63.569-113.316-63.569C59.556,32.952,0,92.522,0,166.008c0,40.009,17.729,75.803,45.671,100.178
			l188.545,188.553c3.22,3.22,7.587,5.029,12.142,5.029c4.555,0,8.922-1.809,12.142-5.029l188.545-188.553
			C474.988,241.811,492.719,206.017,492.719,166.008z"
              />
            </svg>
            {{ snippet.likes }}
          </div>
          <div class="skeleton skeleton-likes" v-if="loading"></div>

          <div class="author">
            <div class="author__pic"></div>
          </div>
        </div>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" v-on:click="closeModal"></button>
  </div>
</template>

<script>
import Prism from "vue-prismjs";
import "prismjs/themes/prism.css";

export default {
  data() {
    return {
      snippet: {},
      liked: false,
      loading: true
    };
  },
  props: {
    snippetId: String
  },
  components: {
    Prism
  },
  methods: {
    async getSnippet() {
      const { data } = await this.$http.get(
        `http://localhost:3000/snippet/${this.snippetId}`
      );
      this.snippet = data.snippet;
      this.loading = false;
    },
    closeModal() {
      this.$emit("closeSnippet");
    }
  },
  mounted() {
    this.getSnippet();
    window.addEventListener("keydown", e => {
      if (e.keyCode === 27) {
        this.closeModal();
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.snippet__box {
  flex: 1 1 100%;
  max-width: 100%;

  .snippet__header {
    align-items: center;
  }

  .snippet__body {
    padding-top: 0;
  }

  .snippet__code {
    max-height: 600px;
    overflow: auto;
  }

  .snippet__description {
    margin-top: 0;
    margin-bottom: $space-4;
  }
}

.modal-close {
  background-color: #fff;
  &::after,
  &::before {
    background-color: $gray-1;
  }
}

.skeleton {
  border-radius: 5px;
  @include background-gradient;
  animation: shine-lines 0.8s infinite ease-out;

  &-title {
    height: 40px;
    width: 200px;
  }

  &-tag {
    height: 25px;
    width: 100px;
  }

  &-description {
    height: 30px;
    width: 90%;
    margin-top: $space-2;
  }

  &-code {
    height: 300px;
    margin-top: $space-3;
  }

  &-likes {
    height: 30px;
    width: 50px;
  }
}

@media screen and (max-width: 768px) {
  .snippet__box {
    margin: 0;
  }
}
</style>
