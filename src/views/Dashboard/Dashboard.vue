<template>

    <sideNav :isDataActive="true" />
    <div class="content">
      <div class="device-container">
        <h1 class="title"> Dashboard </h1>
        <div class="card-wrapper">
          <lazyCard v-if="loading" v-for="card in 4" />
          <div v-for="device in mergedList" :key="device.id" class="card" @click="router.push({ name: 'Dashboard Details', params: { id: device.IMEINumber }})">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <Indicator :status="device.indicator"/>
                <h1 class="font-medium text-lg text-[#353535]">{{device.deviceName}}</h1>
              </div>
              <div class="signal">
                <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="20" width="3" height="6" rx="1.5" fill="#34C759"/>
                  <rect x="6" y="15" width="3" height="11" rx="1.5" fill="#34C759"/>
                  <rect x="12" y="10" width="3" height="16" rx="1.5" fill="#34C759"/>
                  <rect x="18" y="5" width="3" height="21" rx="1.5" fill="#34C759"/>
                  <rect x="24" width="3" height="26" rx="1.5" fill="#D1D1D6"/>
                </svg>
              </div>
            </div>
            <h1 class="text-sm text-[#353535]/60">{{device.IMEINumber}}</h1>
          </div>
        </div>
      </div> 
    </div>    
</template>
  
<script setup>
import lazyCard from '@/components/loading/lazyCard.vue';
import Indicator from '@/components/Indicator.vue'
import sideNav from '@/components/navigation/sideNav.vue'
import Button from '@/components/button/BaseButton.vue'
import { onBeforeMount, ref, onUnmounted } from 'vue';
import { useDevicesStore } from '@/stores/DevicesStore'
import { useRealtimeDataStore } from '@/stores/RealtimeDataStore'
import { storeToRefs } from 'pinia'
import router from '@/router';
 

  const devicesStore = useDevicesStore()
  const realtimeDataStore = useRealtimeDataStore()
  const { devicesList } = storeToRefs(useDevicesStore())
  const { devicesStatus } = storeToRefs(useRealtimeDataStore())
  const mergedList = ref([])
  const loading = ref(false)
 
  async function getDevicesList() {
    await devicesStore.loadDevices()
    await realtimeDataStore.getDevicesStatus()
    const defaultValue = { IPAddress: "-",imei: "-",indicator: 0,lastHandshake: "-",port: "-",status: "OFFLINE",_measurement: "-",_time: "-"}
    mergedList.value = devicesList.value.map(device => {
      const tcpStatusData = devicesStatus.value.find(status => status.imei === device.IMEINumber) || defaultValue
      return { ...device, ...tcpStatusData }
    })
    console.log(mergedList.value)
  }
 
  onBeforeMount( async () => {
    loading.value = true
    await getDevicesList()
    loading.value = false
  })

  const getDevicesInterval = setInterval(getDevicesList,5000)

  onUnmounted(() => {
    clearInterval(getDevicesInterval)
  })


  

  
</script>
  
<style scoped>


.content {
  @apply w-full h-fit relative
}
.device-container {
  @apply 
    pl-[32px] pb-[32px] flex flex-col gap-9 pt-[32px]
}
.title {
  @apply
    text-[28px] font-thin flex justify-start items-center text-[#353535] opacity-80
}
.card-wrapper {
  @apply
    grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 
}
.card {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  @apply 
    rounded-md bg-white cursor-pointer
    flex flex-col p-6 text-left border gap-2
}
.card:hover {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
}
  </style>