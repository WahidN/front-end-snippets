<template>
  <div class="snippet__box card" @click="showSnippet">
    <div class="snippet__header">
      <div class="language-tag" v-bind:class="snippet.category">{{ snippet.category }}</div>
      <div class="snippet__controls" v-if="showControls">
        <button
          role="button"
          aria-label="delete snippet"
          class="delete-snippet"
          @click.stop="removeSnippet"
        >
          <svg
            version="1.1"
            width="15px"
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
        </button>
        <button
          role="button"
          aria-label="edit snippet"
          class="edit-snippet"
          @click.stop="editSnippet"
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="15px"
            viewBox="0 0 528.899 528.899"
            style="enable-background:new 0 0 528.899 528.899;"
            xml:space="preserve"
          >
            <path
              d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
		c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
		C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
		L27.473,390.597L0.3,512.69z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="snippet__body">
      <h1 class="snippet__title">{{ snippet.title }}</h1>
      <div class="snippet__description">
        <p>{{ snippet.description }}</p>
      </div>
    </div>
    <div class="snippet__footer">
      <div
        class="likes"
        @click.stop="addLike"
        :class="{ liked: liked, disabled: !isAuthenticated }"
      >
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
import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters(["isAuthenticated"])
  },
  methods: {
    ...mapActions(["deleteSnippet", "updateSnippet"]),
    removeSnippet() {
      this.deleteSnippet(this.snippet._id);
    },
    addLike() {
      this.liked = !this.liked;
      let newSnippet = {
        id: this.snippet._id,
        title: this.snippet.title,
        description: this.snippet.description,
        code: this.snippet.code,
        category: this.snippet.category,
        likes: (this.snippet.likes += 1)
      };
      console.log(newSnippet);
      this.updateSnippet(newSnippet);
    },
    showSnippet() {
      this.$emit("clickedSnippet", this.snippet._id);
    },
    editSnippet() {
      this.$emit("editSnippet", this.snippet._id);
    }
  }
};
</script>

<style lang="scss" scoped>
.snippet__box {
  cursor: pointer;

  &:hover {
    box-shadow: 1em 1em 1em 0em rgba(10, 10, 10, 0.1),
      0 0 5px 1px rgba(10, 10, 10, 0.02);
    transition: box-shadow 0.3s ease-in-out;
  }
}
</style>
