<template>
  <!-- <svg class="xinhao-icon" aria-hidden="true" >
    <use :xlink:href="iconName" />
  </svg> -->
  <i
    :class="`xinhao-icon iconfont ${iconName}`"
    :style="`color:${color};cursor:${cursor};font-size:${fontSize};background: none !important;`"
  ></i>
</template>

<script>
  import { defineComponent } from 'vue';
  import '@/styles/font/iconfont.js';
  export default defineComponent({
    name: "commonSvg",
    props: {
      iconName: String,
      color: {
        type: String,
        default: 'inherit',
      },
      cursor: {
        type: String,
        default: 'inherit',
      },
      fontSize: {
        type: String,
        default: 'inherit',
      },
    },
    data() {
      return {};
    },
    created() {},
    methods: {},
  });
</script>

<style lang="scss" scoped></style>
