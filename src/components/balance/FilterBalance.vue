<template>
  <div>
    <button
      @click.prevent="filterIsVisible = !filterIsVisible"
      class="border p-3 rounded-xl"
    >
      Filtrar
    </button>
    <Dropdown v-show="filterIsVisible" class="dropdown">
      <template v-slot:header>
        <span class="text-xl">Filtro</span>
        <button class="" @click.prevent="filterIsVisible = !filterIsVisible">
          <i class="icon icon-close bg-zinc-700 h-[24px] w-[24px]"></i>
        </button>
      </template>
      <template v-slot:body>
        <div class="gap-y-16">
          <label class="my-4">
            Mês:
            <select
              v-model="monthSelected"
              class="w-full border p-2 rounded-xl bg-white"
            >
              <option v-for="i in 12" :key="i" :value="i">
                {{ getMonth(i) }}
              </option>
            </select>
          </label>

          <label class="mt-4">
            Ano:
            <input
              class="w-full border p-2 rounded-xl bg-white"
              type="number"
              v-model="yearSelected"
            />
          </label>
        </div>
      </template>
      <template v-slot:footer>
        <button @click.prevent="filter()" class="rounded-lg border w-full p-2">
          Filtrar
        </button>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import Dropdown from "../common/Dropdown.vue";
import moment from "moment";
export default {
  name: "FilterBalance",
  components: { Dropdown },
  data() {
    return {
      filterIsVisible: false,
      mensageError: "",
      monthSelected: 1,
      yearSelected: 2022,
    };
  },
  created() {
    this.monthSelected = moment().month();
    this.yearSelected = moment().year();
  },

  watch: {
    mensageError() {
      setTimeout(() => {
        this.mensageError = "";
      }, 2340);
    },
  },

  methods: {
    filter() {
      this.$emit("filter", {
        month: this.monthSelected,
        year: this.yearSelected,
      });
      this.filterIsVisible = !this.filterIsVisible;
    },
    getMonth(i) {
      return moment(`2000-${i}-01`).format("MMMM");
    },
  },
};
</script>

<style scoped>
.dropdown {
  /* right: 0.8rem; */
  top: 2rem;
  width: 300px;
  /* margin-right: -20px; */
  margin-top: 95px;
  margin-left: -230px;
  /* @media (max-width: 720px) {
    max-width: 100%;
  }
  .title-filter {
    font-size: 18px;
    color: #444;
    font-weight: 400;
  } */
}
</style>
