<template>
  <el-submenu :index="menu.path || uniqueId">
    <template slot="title">
			<!-- <i class="fa fa-dashboard"></i> -->
			<i  :class="menu.icon"></i>
      <!-- <i v-if="menu.icon" :class="menu.icon"></i>
      <i v-if="menu.icon === undefined & !menu.iconSvg" class="fa fa-folder-o"></i>
      <d2-icon-svg v-if="menu.iconSvg" :name="menu.iconSvg"/> -->
      <span>{{menu.title}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.items">
			<el-menu-item  :index="child.path || uniqueId"  :key="childIndex">
				<i  :class="child.icon"></i>
				<!-- <i class="fa fa-circle-o"></i> -->
				<span slot="title">{{child.title || '未命名菜单'}}</span>
			</el-menu-item>
      <!-- <d2-layout-header-aside-menu-item v-if="child.items === undefined" :menu="child" :key="childIndex"/>
      <d2-layout-header-aside-menu-sub v-else :menu="child" :key="childIndex"/> -->
    </template>
  </el-submenu>
</template>

<script>
import { uniqueId } from 'lodash'
// 组件
import d2LayoutMainMenuItem from '../menu-item'

export default {
  name: 'd2-layout-header-aside-menu-sub',
  components: {
    'd2-layout-header-aside-menu-item': d2LayoutMainMenuItem
  },
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      uniqueId: uniqueId('d2-menu-empty-')
    }
  }
}
</script>
