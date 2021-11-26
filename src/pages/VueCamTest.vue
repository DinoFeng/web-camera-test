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
                option(v-for='device in devices', :key='device.deviceId', :value='device.deviceId') {{ device.label }}
            .col-md-12
              q-btn(type='button', @click='onStart') 打开摄像头
              q-btn(type='button', @click='onStop') 关闭摄像头
              q-btn(type='button', @click='onCapture') 拍照
              q-btn(type='button', @click='onSave') Save
          vue-web-cam(
            ref='webcam',
            :device-id='deviceId',
            width='100%',
            @started='onStarted',
            @stopped='onStopped',
            @error='onError',
            @cameras='onCameras',
            @camera-change='onCameraChange'
          )
          
      .col-md-6
        h2 Captured Image {{ info }}
        figure.figure
          img.img-responsive(:src='img')
</template>

<script>
import { WebCam } from 'vue-web-cam'
export default {
  name: 'vuecamtest', // https://juejin.cn/post/6844904046436843527
  components: { 'vue-web-cam': WebCam },
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
