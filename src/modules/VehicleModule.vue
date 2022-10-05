<template>
  <div class="page-wrapper">
    <header class="mt-4 p-2 border-b flex justify-between items-end">
      <h3 class="text-4xl">Vehicles/equipamentos</h3>
    </header>
    <ul class="flex flex-wrap bg-zinc-50 gap-2 p-1 py-3 rounded-b-lg">
      <li v-for="(item, i) in companies" :key="i" class="">
        <button @click="handleSelectCompany(item.id)">
          <small
            class="rounded-full px-2 py-1 border border-gray-300"
            :class="item.isVisible ? 'bg-blue-300 text-blue-800' : ''"
          >
            {{ item.name }}
            <!-- class="bg-white p-1 py-0 text-[14px] rounded-full" -->
            <small v-show="item.isVisible" class="">
              ({{ companyMap.get(item.id).veicleTotal || 0 }})
            </small>
          </small>
        </button>
      </li>
    </ul>

    <!-- <h1 class="text-lg mt-4 border-b p-2">Vehicles ({{ vehicles.length }})</h1> -->
    <h3>Resultado ({{ vehicles.lenght }})</h3>
    <section class="mt-4 py-4 h-[75vh] box-limited">
      <div class="flex w-full flex-wrap">
        <div v-for="(vehicle, i) in vehicles" :key="i" class="w-1/2 p-1">
          <CardVehicle
            :plate="vehicle.placa"
            :isActive="vehicle.device_install_status !== 0"
            :instaltDate="vehicle.device_install_date"
            :unistalDate="vehicle?.device_uninstall_date || ''"
            :lastTimestamp="vehicle.last_timestamp"
            :lastIgnitionTimestamp="vehicle.last_ignition_timestamp"
            :companyName="
              companyMap.get(vehicle.company)
                ? companyMap.get(vehicle.company).name
                : '--'
            "
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "../serve/api";
import CardVehicle from "../components/vheicle/CardVehicle.vue";
import moment from "moment";
// import Modal from "../components/common/Modal.vue";
// import { PhHorse } from "phosphor-vue";
export default {
  name: "BalanceModule",
  components: {
    CardVehicle,
    // Modal,
  },
  data() {
    return {
      compnayList: [],
      vehicles: 0,
      endDate: "",
      statrDate: "",
    };
  },

  async created() {
    this.endDate = moment().endOf("month").format("YYYY-MM-DD");
    this.statrDate = moment().startOf("month").format("YYYY-MM-DD");

    const uid = localStorage.getItem("user_id");
    api.get(`users/${uid}`).then((res) => {
      const visibleCompany = res.data.visible_companies;

      api.get("users/availableCompanies").then((res) => {
        this.compnayList = res.data.map((el) => ({
          ...el,
          isVisible: visibleCompany.includes(el.id),
        }));
      });
    });
    await this.handeGetVehicle();
  },

  computed: {
    companies() {
      return this.compnayList;
    },

    companyMap() {
      return new Map(this.compnayList.map((el) => [el.id, el]));
    },

    dateSelected() {
      return `${moment(this.statrDate).format("DD/MMM")} a
      ${moment(this.endDate).format("DD/MMM/YYYY")}`;
    },
  },

  methods: {
    handeGetVehicle() {
      api
        .get(
          "/vehicles?&limit=10000"
          // "/vehicles?&limit=10000&page=1&fields=placa,device_install_date,device_uninstall_date,identificador,device_install_status,last_ignition_timestamp,company"
        )
        .then((res) => {
          this.vehicles = res.data.rows;
          this.vehicles.forEach((el) => {
            this.compnayList = this.compnayList.map((company) => ({
              ...company,
              veicleTotal:
                el.company === company.id
                  ? (company.veicleTotal || 0) + 1
                  : company.veicleTotal,
            }));
          });
        });
    },

    async handleSelectCompany(companyId) {
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
