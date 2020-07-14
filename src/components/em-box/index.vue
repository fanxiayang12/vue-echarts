<template>
  <div :class="`box box-${theme}`">
    <div class="box-header" :class="tabs.length > 0 ? 'box-tabs' : ''">
      <h3 v-if="title" class="box-title" v-html="title"></h3>
      <h3
        class="box-tab"
        :class="item.active?'active':''"
        v-for="(item ,index) in tabs"
        :key="index"
        @click="onTabClick(item)"
        v-html="item.title"
      ></h3>
      <slot name="header" />
      <div v-if="$slots.footer || showClose" class="box-tools">
        <slot name="tools" />
        <el-button
          v-if="showClose"
          type="text"
          @click="onClose"
          class="text-info"
          icon="fa fa-remove"
        ></el-button>
      </div>
    </div>
    <div class="box-body" :class="noPadding?'no-padding':''">
      <slot />
    </div>
    <div v-if="$slots.footer" class="box-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    theme: {
      type: String,
      required: false,
      default: "primary"
    },
    title: {
      type: String,
      required: false,
      default: ""
    },
    noPadding: {
      type: Boolean,
      required: false,
      default: false
    },
    showClose: {
      type: Boolean,
      required: false,
      default: false
    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  mounted() {},
  methods: {
    onClose() {
      this.$emit("onClose");
    },
    onTabClick(item) {
      this.$emit("onTabClick", item);
    }
  }
};
</script>
