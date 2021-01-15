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
          <div class="skeleton skeleton-likes" v-if="loading"></div>

          <div class="author">
            <div class="author__pic"></div>
          </div>
          <div class="clipboard" @click="copyCode">
            <span class="has-text-success" v-if="copied">Copied to clipboard!</span>
            <i class="material-icons">assignment</i>
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
      loading: true,
      copied: false
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
        `http://localhost:3300/snippet/${this.snippetId}`
      );
      this.snippet = data.snippet;
      this.loading = false;
    },
    closeModal() {
      this.$emit("closeSnippet");
      this.copied = false;
    },
    copyCode() {
      try {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(this.snippet.code);
        } else if (window.clipboardData) {
          // IE
          window.clipboardData.setData("text", this.snippet.code);
        } else {
          // other browsers, iOS, Mac OS
          this.copyToClipboard();
        }

        this.copied = true;
      } catch (e) {
        alert("Please copy coupon manually.");
      }
    },
    copyToClipboard() {
      // Create new element
      var el = document.createElement("textarea");
      // Set value (string to be copied)
      el.value = this.snippet.code;
      // Set non-editable to avoid focus and move outside of view
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(el);
      // Select text inside element
      el.select();
      // Copy text to clipboard
      document.execCommand("copy");
      // Remove temporary element
      document.body.removeChild(el);
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

  .clipboard {
    cursor: pointer;
    display: flex;
    align-items: center;

    span {
      margin-right: 5px;
    }
  }

  .snippet__footer {
    display: flex;
    justify-content: space-between;
  }

  .snippet__description {
    margin-top: 0;
    margin-bottom: $space-4;
    max-height: 100%;
    text-overflow: unset;
    -webkit-line-clamp: unset;
  }
}

.modal-content {
  width: 100%;
  max-width: 1200px;
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
