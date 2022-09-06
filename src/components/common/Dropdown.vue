<template>
  <div class="box-form">
    <div class="">
      <div class="flex justify-between border-b p-3">
        <slot name="header"></slot>
      </div>

      <div class="p-3">
        <form class="">
          <slot name="body"></slot>
        </form>
      </div>

      <div class="border-t p-2">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoxForm",
  data() {
    return {
      error: "",
    };
  },
};
</script>

<style scoped>
.box-form {
  position: absolute;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 0.8rem;
  /* padding: 33px; */
  z-index: 66;
}
input,
select {
  border: 1px solid #666;
}
.header {
  font-size: 18px;
  color: #444;
  font-weight: 400;
  border-bottom: 1px solid #ccc;
}
.icon {
  height: 24px;
  width: 24px;
}
</style>
