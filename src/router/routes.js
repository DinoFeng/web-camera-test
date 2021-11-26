const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'NativeCodeTest', component: () => import('pages/CameraTest.vue') },
      { path: 'VueCamComponentTest', component: () => import('pages/VueCamTest.vue') },
      { path: 'MyCamComponentTest', component: () => import('pages/MyCamTest.vue') },
      { path: 'UploaderTest', component: () => import('pages/UploaderTest.vue') },
      { path: 'MyInputFileTest', component: () => import('pages/MyInputFileTest.vue') },
      { path: 'CheckPlatform', component: () => import('pages/CheckPlatform.vue') },
    ],
  },
  // { path: '/', component: () => import('pages/VueCamTest.vue') },
  // { path: '/', component: () => import('pages/CameraTest.vue') },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
]

export default routes
