<template>
  <div class="flex">
    <aside class="w-1/2 bg-zinc-100 h-[100vh] flex items-center justify-center">
      <h1 class="text-3xl">DA Backoffice</h1>
    </aside>
    <aside class="w-1/2 bg-white h-[100vh] flex items-center justify-center">
      <form class="flex flex-col justify-end items-end">
        <div
          v-show="mensagemError"
          class="w-full flex justify-between rounded border-red-400 bg-red-200 p-3"
        >
          Erro no login!
          <button @click.prevent="mensagemError = ''">
            <i class="icon icon-close h-[20px] w-[20px] bg-zinc-400"></i>
          </button>
        </div>
        <div v-if="confirm_2fa">
          <label class="flex flex-col my-2">
            Codigo
            <input
              class="input-dark input my-1"
              type="email"
              v-model="code_2fa"
            />
          </label>
          <button class="btn-dark" @click.prevent="confirm_2fa = !confirm_2fa">
            Voltar
          </button>
        </div>
        <div v-else>
          <label class="flex flex-col my-2">
            Email
            <input class="input-dark input my-1" type="email" v-model="email" />
          </label>
          <label class="flex flex-col my-1">
            Senha
            <input
              class="input-dark input"
              type="password"
              v-model="password"
            />
          </label>
        </div>
        <div class="mt-3">
          <button v-if="!isLoading" class="btn-dark" @click.prevent="login">
            Entrar
          </button>
          <SpinnerAnimation v-else />
        </div>
      </form>
    </aside>
  </div>
</template>

<script>
import auth from "../utils/auth";
import SpinnerAnimation from "../components/common/SpinnerAnimation.vue";

export default {
  //   name: "Login",
  components: { SpinnerAnimation },
  data() {
    return {
      email: "",
      password: "",
      isLoading: "",
      mensagemError: "",
      confirm_2fa: false,
      request_status_code: 0,
      code_2fa: "",
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      this.request_status_code = await auth.login(
        this.email,
        this.password,
        this.code_2fa
      );
      if (this.request_status_code === 200) {
        if (this.$route.query && this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        } else {
          // this.setUserLogin(this.isLogged);
          this.$router.push({ name: "Home" });

          this.isLoading = false;
        }
      } else if (this.request_status_code === 406) {
        this.isLoading = false;
        this.confirm_2fa = true;
      } else {
        this.isLoading = false;
        this.mensagemError = "Erro na autenticação";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
