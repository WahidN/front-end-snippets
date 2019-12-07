<template>
  <header>
    <nav class="nav" role="navigation" aria-labelledby="mainNavigation">
      <div class="nav__logo">
        <router-link to="/">
          <h1>Front-end Snippets</h1>
        </router-link>
      </div>
      <div class="nav__profile">
        <router-link v-if="!isAuthenticated" to="/login" class="button is-dark">Login</router-link>
        <div
          v-if="isAuthenticated"
          class="dropdown is-right"
          v-bind:class="{ 'is-active': profileDropdown }"
        >
          <div class="dropdown-trigger profile" @click="profileDropdown = !profileDropdown">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <i class="material-icons">account_circle</i>
            </button>
            <span>{{ getUserEmail }}</span>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <router-link to="/admin" class="dropdown-item">Dashboard</router-link>
              <hr class="dropdown-divider" />
              <a class="dropdown-item" v-on:click="logOut">Log out</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <nav class="nav sub-nav" role="navigation" aria-labelledby="subNavigation">
      <div class="nav__content">
        <ul>
          <li
            class="all"
            v-bind:class="[activeCategory === null ? 'active' : '']"
            @click="selectCategory(null)"
          >All</li>
          <li
            class="js"
            v-bind:class="[activeCategory === 'javascript' ? 'active' : '']"
            @click="selectCategory('javascript')"
          >Javascript</li>
          <li
            class="css"
            v-bind:class="[activeCategory === 'css' ? 'active' : '']"
            @click="selectCategory('css')"
          >CSS</li>
          <li
            class="html"
            v-bind:class="[activeCategory === 'Html' ? 'active' : '']"
            @click="selectCategory('Html')"
          >HTML</li>
        </ul>
      </div>
      <div class="nav__content">
        <div class="control">
          <div class="select">
            <select>
              <option>New</option>
              <option>Popular</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      profileDropdown: false,
      activeCategory: null
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "ACTIVE_CATEGORY", "getUserEmail"])
  },
  methods: {
    selectCategory(value) {
      this.$store.commit("filterByCategory", value);
      this.activeCategory = this.ACTIVE_CATEGORY;
    },
    logOut() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  padding: $space-4 $space-7;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .nav__logo {
    h1 {
      color: $primary-color;
      font-weight: 900;
      font-size: 1.5rem;
    }
  }

  .nav__profile {
    .profile {
      display: flex;
      align-items: center;
      button {
        border-radius: 50%;
        padding: 0;
        width: 2.5rem;
        margin-right: $space-2;
      }
    }
  }

  .nav__content {
    ul {
      display: flex;
      margin: 0;
      align-items: center;

      li {
        display: inline-flex;
        font-weight: bold;
        text-decoration: none;
        margin: 0 $space-3;
        cursor: pointer;
        position: relative;

        &:first-child {
          margin-left: 0;
        }

        &::after {
          content: "";
          display: block;
          height: 3px;
          width: 0;
          background-color: #000;
          position: absolute;
          bottom: 0;
          left: 0;
          margin-top: 1px;
          transition: width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        &:hover,
        &.active {
          &::after {
            width: 100%;
            transition: width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          &.js {
            &::after {
              background-color: #ecda73;
            }
          }

          &.css {
            &::after {
              background-color: #60b6f7;
            }
          }

          &.html {
            &::after {
              background-color: #68d39f;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    padding: $space-4 $space-2;
  }
}

.sub-nav {
  justify-content: space-between;
}
</style>
