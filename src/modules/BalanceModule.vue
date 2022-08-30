<template>
  <h1 class="text-6xl">Financeiro</h1>
</template>

<script>
import api from "../serve/api";

export default {
  name: "BalanceModel",

  created() {
    api
      .get(
        "/vehicles?&limit=100&page=1&active=false&device_install_status=0&fields=placa,device_install_date,device_uninstall_date,identificador,device_install_status,last_ignition_timestamp"
      )
      // fields=placa,device_install_date,device_uninstall_date,identificador,device_install_status,last_ignition_timestamp
      .then((res) => {
        console.log("acho => ", res);
      });
  },
};
</script>
