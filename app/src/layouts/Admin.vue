<template>
  <div class="layout">
    <SideBar />
    <main class="main-content">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import SideBar from "./partials/SideBar.vue";

export default {
  components: {
    SideBar
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  min-height: 100vh;

  .sidebar {
    flex: 1 1 10%;
  }

  .main-content {
    flex: 1 1 90%;
    padding: $space-5 $space-7;
    margin-left: 72px;
  }

  @media screen and (max-width: 480px) {
    .main-content {
      margin-left: 0;
      flex: 1 1 100%;
      padding: $space-5 $space-3;
      margin-bottom: $space-8;
    }
  }
}
</style>