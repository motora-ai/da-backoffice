<template>
  <table class="table">
    <thead class="border-b border-red-500">
      <slot name="header"></slot>
    </thead>

    <slot></slot>
  </table>
</template>

<style scoped>
table {
  font-weight: 300;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-top: -8px;
}

td:first-child {
  border-left: none !important;
}
td:last-child {
}
th {
  text-align: center;
  vertical-align: 2;
  font-weight: 500;
  /* padding: 5px; */
  /* border: none; */
  /* color: #999999 !important; */
  /* border-bottom: 1px solid #eaeaea; */
}
table,
td {
  /* font-size: 22px; */
  /* border-bottom: 1px solid #eaeaea; */

  /* border-top: none !important; */
  /* height: 100%; */
  /* padding: 5px !important; */
  /* color: #000000; */
  /* @apply border-b;
  border-bottom: 1px solid #cccccc; */
}
</style>
