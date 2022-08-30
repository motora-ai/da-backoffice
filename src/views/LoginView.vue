<template>
  <div class="flex">
    <aside class="w-1/2 bg-zinc-100 h-[100vh] flex items-center justify-center">
      <h1 class="text-3xl">DA Backoffice</h1>
    </aside>
    <aside class="w-1/2 bg-white h-[100vh] flex items-center justify-center">
      <form class="flex flex-col justify-end items-end">
        <label class="flex flex-col my-2">
          Email
          <input
            class="input-dark input my-1"
            placeholder="teste"
            type="email"
            v-model="email"
          />
        </label>
        <label class="flex flex-col my-1">
          Senha
          <input
            class="input-dark input"
            placeholder="teste"
            type="password"
            v-model="password"
          />
        </label>
        <div class="mt-3">
          <button class="btn-dark" @click.prevent="login">Entrar</button>
        </div>
      </form>
    </aside>
  </div>
</template>

<script>
import auth from "../utils/auth";

export default {
  //   name: "Login",
  data() {
    return {
      email: "",
      password: "",
      isLoading: "",
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      this.isLogged = await auth.login(this.email, this.password);
      if (this.isLogged) {
        if (this.$route.query && this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          // this.setUserLogin(this.isLogged);
          this.$router.push({ name: "Home" });

          this.isLoading = false;
        }
      } else {
        this.isLoading = false;
        this.mensagemError = "Erro na autenticação";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
