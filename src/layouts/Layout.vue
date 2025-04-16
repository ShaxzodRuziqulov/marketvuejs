<template>
  <div class="main">
    <div class="header">
      <Header />
    </div>
    <div class="body">
<!--      <div class="sidebar border border-amber-400">Menu</div>-->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from "../components/Header.vue";
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header {
    width: 100%;
    height: 50px;
    background-color: #3955ff;
    color: white;
  }

  .body {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;

    .sidebar {
      width: 250px;
      height: 100%;
    }

    .content {
      width: calc(100% - 250px);
      height: 100%;
      padding: 16px;
    }
  }
}
</style>