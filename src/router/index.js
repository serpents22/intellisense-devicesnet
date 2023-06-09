import { createRouter, createWebHistory } from 'vue-router'
import { useLoadingStore } from '@/stores/LoadingStore'

import LoginForm from '@/views/Auth/LoginFormNew.vue'
import DevicesList from '@/views/Devices/DevicesList.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import DashboardDetails from '@/views/Dashboard/TDashboardDetails.vue'
import DeviceDetails from '@/views/Devices/DeviceDetails.vue'
import ResetPassword from '@/views/Auth/ResetPassword.vue'
import MainMap from '@/views/Map/MainMap.vue'
import NotFound from '@/views/error/NotFound.vue'

const routes = [
  { path: '/', name: 'Login Page', component: LoginForm, meta: { requiresAuth:false, title: 'Intellisense DevicesNet - Login',  } },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword, meta: { requiresAuth:false} },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth:true }},
  { path: '/dashboard/details/:id', name: 'Dashboard Details', component: DashboardDetails,props: true, meta: { requiresAuth:true }},
  
  { path: '/devices', name: 'Devices List', component: DevicesList, meta: { requiresAuth:true }},
  { path: '/devices/details/:id', name: 'Device Details', component: DeviceDetails, props: true, meta: { requiresAuth:true }},
  { path: '/geolocation', name: 'MainMap', component: MainMap, meta: { requiresAuth:true } },

  { path: '/:catchALL(.*)', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

router.beforeEach(async (to, from,  next) => {
  document.title = 'Intellisense DevicesNet | Connecting Assets'
  if (to.meta.requiresAuth && !localStorage.getItem('auth.accessToken')){
    next({ name: 'Login Page'})
  } else if (to.meta.requiresAuth && localStorage.getItem('auth.accessToken') || to.meta.freeAccess){
    next()
  } else if (!to.meta.requiresAuth && localStorage.getItem('auth.accessToken')){
    next({name: 'Devices List'})
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