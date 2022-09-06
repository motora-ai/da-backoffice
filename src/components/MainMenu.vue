<template>
  <nav class="flex items-center justify-between flex-col h-full border">
    <button class="btn mt-7">
      <router-link to="/">
        <i class="icon icon-phosfore-command bg-zinc-800 h-[30px] w-[30px]"></i>
      </router-link>
    </button>

    <ul class="p-5 h-50">
      <li v-for="btnRoute in btnRoutes" v-bind:key="btnRoute" class="p-2">
        <router-link :to="{ name: btnRoute.name }">
          <button
            class="btn p-2 rounded-xl border-solid"
            :class="
              routerNameSelected === btnRoute.name
                ? 'border border-gray-500'
                : ''
            "
          >
            <i
              class="icon bg-zinc-800 h-[30px] w-[30px]"
              :class="btnRoute.icon"
            ></i>
          </button>
        </router-link>
      </li>
    </ul>

    <button class="btn mb-7" @click="logout">
      <i class="icon icon-phosfore-sig-out bg-zinc-800 h-[30px] w-[30px]"></i>
    </button>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";
// import { useRoute, useRouter } from "vue-router";
import Auth from "../utils/auth";

export default {
  name: "MainMenu",
  data: () => ({
    routerNameSelected: "",
    btnRoutes: [
      {
        name: "Balance",
        path: "/balance",
        icon: "icon-phosfore-currency-circle-dollar",
      },

      {
        name: "Vehicle",
        path: "/vehicle",
        icon: "icon-phosfore-car",
      },
    ],
  }),
  created() {
    this.routerNameSelected = useRoute().name;
  },
  watch: {
    $route(to) {
      this.routerNameSelected = to.name;
    },
  },

  methods: {
    logout() {
      Auth.logout();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped></style>
