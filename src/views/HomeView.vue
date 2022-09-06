<template>
  <div class="flex">
    <aside class="h-[100vh] w-[6rem]"><MainMenu /></aside>
    <aside class="body-area h-[100vh] p-4 box-limited">
      <router-view></router-view>
    </aside>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import MainMenu from "../components/MainMenu.vue";
export default {
  name: "HomeView",
  components: {
    MainMenu,
  },
};
</script>

<style scoped>
.body-area {
  width: calc(100% - 8rem);
}
</style>
