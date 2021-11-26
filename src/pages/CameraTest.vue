<template lang="pug">
q-layout
  .button
    q-btn(@click='getCompetence()') 打开摄像头
    q-btn(@click='stopNavigator()') 关闭摄像头
    q-btn(@click='setImage()') 拍照
    q-btn(@click='saveImage()') Save
  div
    video#videoCamera(:width='videoWidth', :height='videoHeight', autoplay='')
    canvas#canvasCamera(style='display: none', :width='videoWidth', :height='videoHeight')
  div(v-if='imgSrc')
    p 效果预览
    img(:src='imgSrc', :width='videoWidth', :height='videoHeight', alt='')
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
      videoWidth: 1280,
      videoHeight: 720,
      imgSrc: '',
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
    }
  },
  mounted() {
    //this.getCompetence()//进入页面就调用摄像头
  },
  methods: {
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this
      _this.thisCancas = document.getElementById('canvasCamera')
      _this.thisContext = this.thisCancas.getContext('2d')
      _this.thisVideo = document.getElementById('videoCamera')
      _this.thisVideo.style.display = 'block'
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            //不存在则报错
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      var constraints = {
        audio: false,
        // video:true,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: 'scaleX(-1)',
        },
      }
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ('srcObject' in _this.thisVideo) {
            _this.thisVideo.srcObject = stream
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream)
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //  绘制图片（拍照功能）
    async saveImage() {
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
            photos: this.imgSrc,
          },
        })
        .then((response) => response.data)
        .then((data) => (this.info = data))
    },
    setImage() {
      var _this = this
      // canvas画图

      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,

        // _this.videoWidth,
        // _this.videoHeight
      )
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL('image/jpeg')
      _this.imgSrc = image //赋值并预览图片
    },
    // 关闭摄像头
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop()
    },
    // // base64转文件，此处没用到
    // dataURLtoFile(dataurl, filename) {
    //   var arr = dataurl.split(",");
    //   var mime = arr[0].match(/:(.*?);/)[1];
    //   var bstr = atob(arr[1]);
    //   var n = bstr.length;
    //   var u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new File([u8arr], filename, { type: mime });
    // }
  },
}
</script>
