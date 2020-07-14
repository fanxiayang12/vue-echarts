<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.userName ? `${info.userName}(${info.telNumber})` : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import service from '../../service'
export default {
  computed: {
    ...mapState('d2admin/user', ['info'])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    async logOff () {
				var vm = this
				vm.$confirm('注销当前账户吗?  打开的标签页和用户设置将会被保存。', '确认退出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          var res = await service.logout()
					if (res.success) {
            vm.logout()
            vm.$router.push({
              name: 'login'
            })
					} else {
							vm.$message.error(res.msg)
					}
        }).catch(() => {
          vm.$message('取消注销用户')
        });
    }
  }
}
</script>
