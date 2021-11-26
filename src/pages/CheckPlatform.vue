<template lang="pug">
q-layout
  .button
    q-btn(@click='test()') Show UserAgent
    q-btn(@click='test2()') Show Platform info
    q-btn(@click='getInfo()') Show mediaDevices
  hr
  div
    textarea(:value='info', :cols='100', :rows='30')
</template>

<script>
export default {
  name: 'CameraTest',

  data() {
    return {
      info: '',
    }
  },
  mounted() {
    //this.getCompetence()//进入页面就调用摄像头
  },
  methods: {
    test() {
      this.info = navigator.userAgent
    },
    test2() {
      this.info = navigator.platform
    },
    async getInfo() {
      const s = await navigator.mediaDevices.enumerateDevices()
      // console.log({ s })
      this.info = JSON.stringify(s, null, 2)
      // console.log({ info: this.info })
    },
  },
}
</script>
