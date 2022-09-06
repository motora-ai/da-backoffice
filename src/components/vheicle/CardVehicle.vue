<template>
  <div
    class="p-4 border rounded-2xl flex flex-col"
    :class="!isActive ? 'border-red-500' : ''"
  >
    <header class="flex justify-between">
      <h3 class="truncate">
        {{ plate }} <span class="text-zinc-500">• {{ companyName }}</span>
      </h3>
      <small
        class="p-1 px-2 rounded-full"
        :class="
          isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        "
      >
        {{ !isActive ? "Desativado" : "Ativo" }}
        {{ dateFronNow(unistalDate ? unistalDate : instaltDate) }}
      </small>
    </header>
    <div class="flex justify-between">
      <small v-show="lastTimestamp">
        Ultimo sinal: {{ dateFronNow(lastTimestamp) }}
      </small>
      <small v-show="lastTimestamp">
        Ultima ignição: {{ dateFronNow(lastIgnitionTimestamp) }}
      </small>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "CardVehicle",
  props: {
    plate: { type: String, default: "" },
    companyName: { type: String, default: "" },
    isActive: { type: Boolean, default: false, required: true },
    instaltDate: { type: String, default: "" },
    unistalDate: { type: String },
    lastTimestamp: { type: String },
    lastIgnitionTimestamp: { type: String },
    // vehicle: Object,
  },

  methods: {
    dateFronNow(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
