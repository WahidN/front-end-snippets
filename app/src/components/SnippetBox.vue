<template>
  <div class="snippet__box card">
    <div class="snippet__header">
      <div class="language-tag" v-bind:class="categoryName.toLowerCase()">{{ categoryName }}</div>
      <div class="snippet__controls" v-if="showControls">
        <div class="delete-snippet" v-on:click="removeSnippet">
          <svg
            version="1.1"
            width="25"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 408.483 408.483"
            style="enable-background:new 0 0 408.483 408.483;"
            xml:space="preserve"
          >
            <g>
              <path
                d="M87.748,388.784c0.461,11.01,9.521,19.699,20.539,19.699h191.911c11.018,0,20.078-8.689,20.539-19.699l13.705-289.316
			H74.043L87.748,388.784z M247.655,171.329c0-4.61,3.738-8.349,8.35-8.349h13.355c4.609,0,8.35,3.738,8.35,8.349v165.293
			c0,4.611-3.738,8.349-8.35,8.349h-13.355c-4.61,0-8.35-3.736-8.35-8.349V171.329z M189.216,171.329
			c0-4.61,3.738-8.349,8.349-8.349h13.355c4.609,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.737,8.349-8.349,8.349h-13.355
			c-4.61,0-8.349-3.736-8.349-8.349V171.329L189.216,171.329z M130.775,171.329c0-4.61,3.738-8.349,8.349-8.349h13.356
			c4.61,0,8.349,3.738,8.349,8.349v165.293c0,4.611-3.738,8.349-8.349,8.349h-13.356c-4.61,0-8.349-3.736-8.349-8.349V171.329z"
              />
              <path
                d="M343.567,21.043h-88.535V4.305c0-2.377-1.927-4.305-4.305-4.305h-92.971c-2.377,0-4.304,1.928-4.304,4.305v16.737H64.916
			c-7.125,0-12.9,5.776-12.9,12.901V74.47h304.451V33.944C356.467,26.819,350.692,21.043,343.567,21.043z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="snippet__body">
      <h1 class="snippet__title">{{ snippet.title }}</h1>
      <div class="snippet__description">
        <p>{{ snippet.description }}</p>
      </div>
    </div>
    <div class="snippet__footer">
      <div class="likes" @click="addLike" :class="{ liked: liked }">
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
      <div class="author">
        <div class="author__pic"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SnippetBox",
  props: {
    snippet: {
      type: Object
    },
    showControls: Boolean
  },
  data() {
    return {
      liked: false
    };
  },
  computed: {
    categoryName() {
      return this.snippet.category === "javascript"
        ? "JS"
        : this.snippet.category;
    }
  },
  methods: {
    ...mapActions(["deleteSnippet", "updateSnippet"]),
    removeSnippet() {
      this.deleteSnippet(this.snippet._id);
    },
    addLike() {
      let newSnippet;
      if (this.liked) {
        newSnippet = {
          Id: this.snippet._id,
          title: this.snippet.title,
          description: this.snippet.description,
          code: this.snippet.code,
          category: this.snippet.category,
          likes: --this.snippet.likes
        };
      } else {
        newSnippet = {
          Id: this.snippet._id,
          title: this.snippet.title,
          description: this.snippet.description,
          code: this.snippet.code,
          category: this.snippet.category,
          likes: ++this.snippet.likes
        };
      }
      console.log("component: ", newSnippet);
      this.updateSnippet(newSnippet);
      this.liked = !this.liked;
    }
  }
};
</script>

<style lang="scss" scoped>
.snippet__box {
  flex: 1 1 25%;
  max-width: calc(25% - 60px);
  margin: 0 20px 20px 0px;

  .snippet__header {
    padding: 1rem 2rem 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .language-tag {
      padding: 2px 5px;
      font-size: 0.8rem;
      text-transform: uppercase;
      border-radius: 0.25rem;
      display: inline-flex;

      &.js {
        background-color: #ecda73;
        color: rgb(97, 83, 2);
      }

      &.css {
        background-color: #60b6f7;
        color: rgb(4, 50, 85);
      }

      &.html {
        background-color: #68d39f;
        color: #01351c;
      }
    }

    .delete-snippet {
      cursor: pointer;

      svg {
        fill: $gray-8;
      }
    }
  }

  .snippet__body {
    padding: 1rem 2rem;

    .snippet__title {
      font-size: 1.5rem;
      font-family: $font-family-heading;
      font-weight: bold;
    }

    .snippet__description {
      margin-top: 0.5rem;
      color: rgb(110, 110, 110);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      max-height: 9rem;
    }
  }

  .snippet__footer {
    padding: 1rem 2rem;

    .likes {
      display: inline-flex;
      align-items: center;
      cursor: pointer;

      &:hover,
      &.liked {
        color: red;

        .heartSVG path {
          fill: red;
        }
      }

      .heartSVG {
        margin-right: 5px;

        path {
          fill: #cecece;
        }
      }
    }
  }
}
</style>
