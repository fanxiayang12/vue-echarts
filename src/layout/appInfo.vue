<template>
  <div></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import service from './service'
import util from '@/libs/util'

export default {
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions({
      saveAppInfo: 'emdata/system/saveAppInfo'
    }),
    async init () {
      var appInfo = {
        name: 'Echarts Playgroud',
        shortName: 'Echarts',
        siteName: '1mdata.com',
        siteUrl: 'http://www.1mdata.com'
      }
      util.cookies.set(
        'app-name',
        appInfo.name + '(' + appInfo.shortName + ')'
      )
      this.saveAppInfo(appInfo)
    }
  }
}
</script>
