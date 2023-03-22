import { createRouter, createWebHistory } from 'vue-router'
import { useLoadingStore } from '@/stores/LoadingStore'

import LoginForm from '@/views/Auth/LoginFormNew.vue'
import MainMap from '@/views/Map/MainMap.vue'
import DevicesList from '@/views/Devices/DevicesList.vue'
import DeviceDetails from '@/views/Devices/DeviceDetails.vue'
import NotFound from '@/views/error/NotFound.vue'



const routes = [
  { path: '/', name: 'LoginForm', component: LoginForm, meta: { requiresAuth:false, title: 'Intellisense DevicesNet - Login' } },
  { path: '/devices', name: 'DevicesList', component: DevicesList, meta: { requiresAuth:false }, props: { useLayout: true } },
  { path: '/devices/device-info/:id', name: 'DeviceDetails', component: DeviceDetails, props: true, meta: { requiresAuth:false } },

  { path: '/:catchALL(.*)', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

router.beforeEach(async (to, from,  next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('auth.token')){
    next({ name: 'LoginForm'})
  } else if (to.meta.requiresAuth && localStorage.getItem('auth.token') || to.meta.freeAccess){
    next()
  } else if (!to.meta.requiresAuth && localStorage.getItem('auth.token')){
    next({name: 'Dashboard'})
  } else next()
  }) 

  //loading
// router.beforeEach(async (to, from, next) => {
//   const loadingStore = useLoadingStore()
//   loadingStore.startLoading()

//   // Wait for 500ms to simulate async operation
//   await new Promise(resolve => setTimeout(resolve, 500))

//   loadingStore.stopLoading()
//   next()
// })

export default router