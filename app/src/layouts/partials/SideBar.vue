<template>
  <nav class="sidebar">
    <ul>
      <li>
        <router-link class="sidebar-link" to="/admin">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 384 384"
            width="25"
            style="enable-background:new 0 0 384 384;"
            xml:space="preserve"
          >
            <g>
              <rect x="213.333" y="0" width="170.667" height="128" />
              <rect x="0" y="0" width="170.667" height="213.333" />
              <rect x="0" y="256" width="170.667" height="128" />
              <rect x="213.333" y="170.667" width="170.667" height="213.333" />
            </g>
          </svg>
          <span>My snippets</span>
        </router-link>
      </li>
      <li>
        <router-link class="sidebar-link" to="/admin/submit">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="25"
            viewBox="0 0 52 52"
            style="enable-background:new 0 0 52 52;"
            xml:space="preserve"
          >
            <path
              d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2
	s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2
	S39.604,28,38.5,28z"
            />
          </svg>
          <span>Add</span>
        </router-link>
      </li>
      <li>
        <router-link class="sidebar-link" to="/admin/favorites">
          <i class="material-icons">favorite</i>
          <span>Favorites</span>
        </router-link>
      </li>
      <li class="button--back">
        <router-link class="sidebar-link" to="/">
          <i class="material-icons">keyboard_return</i>
          <span>Back</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-flow: column;
  position: fixed;
  top: 0;
  bottom: 0;
  align-self: flex-start;
  z-index: 1;
  background-color: #fff;
  padding: $space-3 0;
  max-width: 82px;

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    li {
      &.button--back {
        margin-top: auto;
      }

      .sidebar-link {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        flex-shrink: 0;
        padding: $space-5 $space-4;
        flex-direction: column;

        &:hover,
        &:active,
        &:focus,
        &.router-link-exact-active {
          background-color: $gray-10;
          color: $primary-color;

          svg {
            fill: $primary-color;
          }
        }

        svg {
          fill: $gray-4;
        }

        .material-icons {
          color: $gray-4;
        }

        span {
          font-size: map-get($font-sizes, "fs-1");
          margin-top: $space-2;
          color: $gray-5;
          text-align: center;
        }
      }
    }
  }
}
</style>