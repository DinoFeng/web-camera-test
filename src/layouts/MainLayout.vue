<template lang="pug">
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ quasarVersion }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8"> Essential Links </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Native Camera Test',
    caption: '原生代码调用Camera测试',
    icon: 'code',
    link: '/#/NativeCodeTest',
  },
  {
    title: 'vue-web-cam Test',
    caption: 'vue-web-cam Camera控件测试',
    icon: 'school',
    link: '/#/VueCamComponentTest',
  },
  {
    title: 'My Camera Component Test',
    caption: '自开发Camera控件测试',
    icon: 'chat',
    link: '/#/MyCamComponentTest',
  },
  {
    title: 'Uploader Test',
    caption: '上传控件测试',
    icon: 'record_voice_over',
    link: '/#/UploaderTest',
  },
  {
    title: 'My Uploader Test',
    caption: '客制化 Input file component测试',
    icon: 'rss_feed',
    link: '/#/MyInputFileTest',
  },
  {
    title: 'Check Platform',
    caption: '检测当前机器平台',
    icon: 'public',
    link: '/#/CheckPlatform',
  },
  // {
  //   title: 'Quasar Awesome',
  //   caption: 'Community Quasar projects',
  //   icon: 'favorite',
  //   link: 'https://awesome.quasar.dev',
  // },
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
    }
  },
  computed: {
    quasarVersion() {
      return this.$q.version
    },
  },
}
</script>
