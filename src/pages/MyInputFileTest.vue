<template lang="pug">
q-layout
  .l-constrained
    .m-box
      form(action='', method='POST', enctype='multipart/form-data')
        .m-upload.js-fileupload
          .m-upload__preview.jst-preview(v-if='!hasImage1')
          q-img(v-if='hasImage1', :src='displayImage1', :ratio='1')
          .m-upload__inputs
            .m-upload__file
              input#ul-button-1(type='file', accept='image/*', @change='onSelectedFiles($event, 1)')
              label(for='ul-button-1')
                q-icon(name='photo_library')
                | 图册
            .m-upload__file
              input#ul-button-2(type='file', accept='image/*', capture='camera', @change='onSelectedFiles($event, 2)')
              label(for='ul-button-2')
                q-icon(name='camera_alt')
                | 拍照
        .m-upload.js-fileupload
          .m-upload__preview.jst-preview(v-if='!hasImage2')
          q-img(v-if='hasImage2', :src='displayImage2', :ratio='1')
          .m-upload__inputs
            .m-upload__file
              input#ul-button-3(type='file', accept='image/*', @change='onSelectedFiles($event, 3)')
              label(for='ul-button-3')
                q-icon(name='photo_library')
                | 图册
            .m-upload__file
              input#ul-button-4(type='file', accept='image/*', capture='camera', @change='onSelectedFiles($event, 4)')
              label(for='ul-button-4')
                q-icon(name='camera_alt')
                | 拍照
</template>

<script>
export default {
  name: 'CameraTest',

  data() {
    return {
      files: null,
      localImage1: null,
      fileName1: null,
      localImage2: null,
      fileName2: null,
    }
  },
  mounted() {},
  computed: {
    hasImage1() {
      return !!this.localImage1
    },
    displayImage1() {
      return this.localImage1
    },
    hasImage2() {
      return !!this.localImage2
    },
    displayImage2() {
      return this.localImage2
    },
  },
  methods: {
    onSelectedFiles(event, f) {
      this.files = event.target.files
      console.debug({ f, files: this.files })
      if (this.files.length > 0) {
        this.readFile(this.files[0], f)
      }
    },
    readFile(file, f) {
      let reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          if (f > 2) {
            this.fileName2 = file.name
            this.localImage2 = reader.result
          } else {
            this.fileName1 = file.name
            this.localImage1 = reader.result
          }
          console.debug({ f, localImage1: this.localImage1, localImage2: this.localImage2 })
        },
        false,
      )
      reader.readAsDataURL(file)
    },
  },
}
</script>
<style lang="scss" scoped>
@import './MyUploaderTest.scss';
</style>
