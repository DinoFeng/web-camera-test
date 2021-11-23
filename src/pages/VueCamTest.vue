<template lang="pug">
q-layout
  .container
    .row
      .col-md-6
        h2 Current Camera
        code(v-if="device") {{ device.label }}
        .border
          vue-web-cam(ref="webcam", :device-id="deviceId", width="100%", @started="onStarted", @stopped="onStopped", @error="onError", @cameras="onCameras", @camera-change="onCameraChange")
          .row
            .col-md-12
              select(v-model="camera")
                option -- Select Device --
                option(v-for="device in devices", :key="device.deviceId", :value="device.deviceId") {{ device.label }}
            .col-md-12
              button(type="button", class="btn btn-success", @click="onStart") Start Camera
              button(type="button", class="btn btn-danger", @click="onStop") Stop Camera
              button(type="button", class="btn btn-primary", @click="onCapture") Capture Photo
      .col-md-6
        h2 Captured Image
        figure.figure
          img(:src="img", class="img-responsive")

</template>

<script>
import { WebCam } from 'vue-web-cam'
export default {
  name: 'vuecamtest',
  components: { 'vue-web-cam': WebCam },
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
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
  },
}
</script>
