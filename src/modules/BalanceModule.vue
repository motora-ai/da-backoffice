<template>
  <div class="page-wrapper">
    <h1 class="text-4xl">Financeiro</h1>

    <header class="mt-4 p-2 border-b flex justify-between items-end">
      <h4 class="text-2xl">
        Veiculos ativos
        <span class="text-xl text-zinc-500">({{ dateSelected }})</span>
      </h4>
      <div class="flex gap-2">
        <FilterBalance @filter="filter" />
        <button class="border rounded-xl p-3">
          <download-csv :data="csvReport" :name="`${dateSelected}.csv`">
            CSV
          </download-csv>
        </button>
      </div>
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

    <section class="mt-4 py-4">
      <div class="flex w-full flex-wrap p-2 border rounded-[20px]">
        <div class="w-full p-2 h-[62vh] box-limited w-full">
          <Table class="w-full">
            <template v-slot:header>
              <tr class="">
                <th>Identificador</th>
                <th>Placa</th>
                <th>Empresa</th>
                <th>Instalação</th>
                <th>Desinstalação</th>
                <th>Dias ativos</th>
              </tr>
            </template>
            <!-- <div class=""> -->
            <tbody class="border w-full">
              <tr v-for="(vehicle, i) in vehiclesFilteres" :key="i" class="p-1">
                <td class="border-b text-center py-2">
                  {{ vehicle.identificador }}
                </td>
                <td class="border-b text-center py-2">
                  {{ vehicle.placa }}
                </td>
                <td class="border-b text-center py-2">
                  {{
                    companyMap.get(vehicle.company)
                      ? companyMap.get(vehicle.company).name
                      : "--"
                  }}
                </td>
                <td class="border-b text-center py-2">
                  {{ dateFilter(vehicle.device_install_date) }}
                </td>
                <td class="border-b text-center py-2">
                  {{ dateFilter(vehicle.device_uninstall_date) }}
                </td>
                <td class="border-b text-center py-2">
                  {{ vehicle.totalDays }}
                </td>
              </tr>
            </tbody>
            <!-- </div> -->
          </Table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "../serve/api";
import moment from "moment";
import Table from "../components/common/TableDefault.vue";
import FilterBalance from "../components/balance/FilterBalance.vue";
import downloadCsv from "vue-json-csv";

export default {
  name: "BalanceModule",
  components: {
    Table,
    FilterBalance,
    downloadCsv,
  },
  data() {
    return {
      compnayList: [],
      vehicles: [],
      endDate: "",
      statrDate: "",
    };
  },

  async created() {
    this.endDate = moment()
      .subtract(1, "month")
      .endOf("month")
      .format("YYYY-MM-DD");
    this.statrDate = moment()
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");

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
    vehiclesFilteres() {
      return this.vehicles
        .filter((el) => {
          if (!el.device_uninstall_date) {
            return el.device_install_date < this.endDate;
          } else {
            return (
              el.device_uninstall_date > this.statrDate &&
              el.device_install_date < this.endDate
            );
          }
        })
        .sort((a, b) =>
          moment(b.device_install_date).diff(
            moment(a.device_install_date),
            "day"
          )
        )
        .map((el) => ({
          ...el,
          totalDays: this.countDayActive(
            el.device_install_date,
            el.device_uninstall_date
          ),
        }));
    },
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
    csvReport() {
      return this.vehiclesFilteres.map((el) => ({
        empresa: this.companyMap.get(el.company)
          ? this.companyMap.get(el.company).name
          : "--",
        veiculo_placa: el.placa || "--",
        veiculo_identificador: el.identificador || "--",
        instaçacao: moment(el.device_install_date).format("DD/MM/YYYY"),
        desinstalacao: el.device_uninstall_date
          ? moment(el.device_uninstall_date).format("DD/MM/YYYY")
          : "--",
        dias_ativos: el.totalDays,
      }));
    },
  },

  methods: {
    filter($event) {
      this.endDate = moment(`${$event.year}-${$event.month}-01`)
        .endOf("month")
        .format("YYYY-MM-DD");
      this.statrDate = moment(`${$event.year}-${$event.month}-01`).format(
        "YYYY-MM-DD"
      );
    },
    dateFilter(date) {
      return date ? moment(date).format("DD/MM/YYYY") : "--";
    },

    countDayActive(instalDate, unistalDate) {
      let initRefDate = `${this.statrDate} 00:00`;
      let endRefDate = `${this.endDate} 23:59`;

      if (unistalDate && unistalDate < this.endDate) {
        endRefDate = moment(unistalDate).format("YYYY-MM-DD 23:59");
      }

      if (instalDate > this.statrDate) {
        initRefDate = moment(instalDate).format("YYYY-MM-DD 23:59");
      }
      return moment(endRefDate).add(1, "day").diff(moment(initRefDate), "days");
    },
    handeGetVehicle() {
      api
        .get(
          "/vehicles?&limit=10000"
          // fields=placa,device_install_date,device_uninstall_date,identificador,device_install_status,last_ignition_timestamp,company"
        )
        .then((res) => {
          this.vehicles = res.data.rows;
          this.compnayList = this.compnayList.map((el) => ({
            ...el,
            veicleTotal: 0,
          }));
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
