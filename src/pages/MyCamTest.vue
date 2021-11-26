<template lang="pug">
q-layout
  .container
    .row
      .col-md-6
        h2 Current Camera
        code(v-if='device') {{ device.label }}
        .border
          .row
            .col-md-12
              select(v-model='camera')
                option -- Select Device --
            .col-md-12
              q-btn(type='button', @click='onStart') 打开摄像头
              q-btn(type='button', @click='onStop') 关闭摄像头
              q-btn(type='button', @click='onCapture') 拍照
              q-btn(type='button', @click='onSave') Save
      .col-md-6
        h2 Captured Image {{ info }}
        figure.figure
          img.img-responsive(:src='img')
</template>

<script>
// https://blog.csdn.net/liuxiao723846/article/details/46864055
// https://blog.csdn.net/huijiMC/article/details/109560819
// https://www.cnblogs.com/crazycode2/p/7699895.html
// https://juejin.cn/post/6959516424125546503
// https://its401.com/article/weixin_37510612/114143525
// https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia
// https://blog.csdn.net/huijiMC/article/details/109560819
// https://www.jianshu.com/p/06ed7c603f40
// https://www.jianshu.com/p/408f749715b1
// https://www.coder.work/article/5229004
// https://blog.csdn.net/zxc514257857/article/details/57626154
export default {
  name: 'CameraTest',

  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      info: '',
    }
  },
  computed: {
    device: function () {
      return this.devices.find((n) => n.deviceId === this.deviceId)
    },
  },
  watch: {
    camera: function (id) {
      this.deviceId = id
    },
    devices: function () {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices
      if (first) {
        this.camera = first.deviceId
        this.deviceId = first.deviceId
      }
    },
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webcam.capture()
    },
    onStarted(stream) {
      console.log('On Started Event', stream)
    },
    onStopped(stream) {
      console.log('On Stopped Event', stream)
    },
    onStop() {
      this.$refs.webcam.stop()
    },
    onStart() {
      this.$refs.webcam.start()
    },
    onError(error) {
      console.log('On Error Event', error)
    },
    onCameras(cameras) {
      this.devices = cameras
      console.log('On Cameras Event', cameras)
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId
      this.camera = deviceId
      console.log('On Camera Change Event', deviceId)
    },
    onSave() {
      // const formData = new FormData()
      // formData.append('photos', this.img)
      this.$axios
        // .post('http://localhost:3000/picture', {
        //   photos: this.img,
        // })
        .request({
          url: 'http://localhost:3000/picture',
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // },
          method: 'post',
          // formData,
          data: {
            photos: this.img,
          },
        })
        .then((response) => response.data)
        .then((data) => (this.info = data))
    },
  },
}
</script>
