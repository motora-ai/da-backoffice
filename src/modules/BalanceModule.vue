<template>
  <h1 class="text-4xl">Financeiro</h1>
  <div>
    <ul class="flex flex-wrap gap-2 mt-8">
      <li v-for="(item, i) in companies" :key="i" class="">
        <button @click="handleSelectCompany(item.id)">
          <small
            class="rounded-full px-2 py-1 border border-gray-300"
            :class="item.isVisible ? 'bg-gray-200' : ''"
          >
            {{ item.name }}
          </small>
        </button>
      </li>
    </ul>

    <h1 class="text-lg mt-4 border-b p-2">Vehicles ({{ vehicles.length }})</h1>

    <section class="mt-2">
      <div class="flex w-full flex-wrap">
        <div v-for="(vehicle, i) in vehicles" :key="i" class="w-1/3 p-1">
          <div
            class="p-4 border rounded-2xl flex flex-col"
            :class="vehicle.device_install_status === 0 ? 'border-red-500' : ''"
          >
            <span>Empresa: {{ companyMap.get(vehicle.company).name }}</span>
            <header class="flex justify-between">
              <span>placa: {{ vehicle.placa }}</span>
              {{
                vehicle.device_install_status === 0 ? "desinstalado" : "Ativo"
              }}
            </header>
            <small>dataInstal: {{ vehicle.device_install_date }}</small>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "../serve/api";

export default {
  name: "BalanceModel",

  data() {
    return {
      compnayList: [],
      vehicles: 0,
    };
  },

  created() {
    this.handeGetVehicle();

    const uid = localStorage.getItem("user_id");
    api.get(`users/${uid}`).then((res) => {
      console.log("Usuario ==> ", res);

      // this.compnayList = res.data;
      const visibleCompany = res.data.visible_companies;

      api.get("users/availableCompanies").then((res) => {
        console.log("availableCompanies ==> ", res);
        this.compnayList = res.data.map((el) => ({
          ...el,
          isVisible: visibleCompany.includes(el.id),
        }));
      });
    });
  },

  computed: {
    companies() {
      return this.compnayList;
    },

    companyMap() {
      return new Map(this.compnayList.map((el) => [el.id, el]));
    },
  },

  watch: {
    compnayList() {
      console.log("Mudoooooooo");
    },
  },
  methods: {
    handeGetVehicle() {
      api
        .get(
          "/vehicles?&limit=10000&page=1&fields=placa,device_install_date,device_uninstall_date,identificador,device_install_status,last_ignition_timestamp,company"
        )
        .then((res) => {
          this.vehicles = res.data.rows;
        });
    },

    async handleSelectCompany(companyId) {
      console.log("==> ", companyId);
      this.compnayList = this.compnayList.map((el) => ({
        ...el,
        isVisible: el.id === companyId ? !el.isVisible : el.isVisible,
      }));

      const uid = localStorage.getItem("user_id");

      await api.put(
        `users/${uid}/visible_companies`,

        {
          visible_companies: this.compnayList
            .filter((i) => i.isVisible)
            .map((el) => el.id),
        }
      );

      this.handeGetVehicle();
    },
  },
};
</script>
