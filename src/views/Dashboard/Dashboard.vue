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
              <SignalIndicator :status="device.GSMSignal" />
            </div>
            <div class="flex gap-2">
              <label for="batt" class="text-sm text-[#353535]/60">IMEI:</label>
              <h1 class="text-sm text-[#353535]">{{device.IMEINumber}}</h1>
            </div>
            <div class="mt-4 flex flex-col gap-2">
              <div class="grid grid-cols-2">
                <div class="flex flex-col gap-1">
                  <label for="batt" class="text-sm text-[#353535]/60">Battery Voltage</label>
                  <h1 class="text-sm text-[#353535]">{{device.batteryVoltage}} mV</h1>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="batt" class="text-sm text-[#353535]/60">Battery Current</label>
                  <h1 class="text-sm text-[#353535]">{{device.batteryCurrent}} mA</h1>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="flex flex-col gap-1">
                  <label for="batt" class="text-sm text-[#353535]/60">External Voltage</label>
                  <h1 class="text-sm text-[#353535]">{{device.externalVoltage}} mV</h1>
                </div>
                <div class="flex flex-col gap-1">
                  <label for="batt" class="text-sm text-[#353535]/60">Satellites Number</label>
                  <h1 class="text-sm text-[#353535]">{{device.satellites}}</h1>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <div class="flex flex-col gap-1">
                  <label for="batt" class="text-sm text-[#353535]/60">GNSS Status</label>
                  <h1 class="text-sm text-[#353535]">{{device.GNSSStatus}}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>    
</template>
  
<script setup>
import lazyCard from '@/components/loading/lazyCard.vue';
import Indicator from '@/components/Indicator.vue'
import sideNav from '@/components/navigation/sideNav.vue'
import { onBeforeMount, ref, onUnmounted } from 'vue';
import { useDevicesStore } from '@/stores/DevicesStore'
import { useRealtimeDataStore } from '@/stores/RealtimeDataStore'
import { storeToRefs } from 'pinia'
import router from '@/router'
import SignalIndicator from '@/components/SignalIndicator.vue';
  const devicesStore = useDevicesStore()
  const realtimeDataStore = useRealtimeDataStore()
  const { devicesList } = storeToRefs(useDevicesStore())
  const { devicesStatus, devicesGeneralData } = storeToRefs(useRealtimeDataStore())
  const mergedList = ref([])
  const loading = ref(false)

  async function getDevicesList() {
    await realtimeDataStore.getDevicesStatus()
    
    for (let index = 0; index < devicesStatus.value.length; index++) {
      await realtimeDataStore.getGeneralData(devicesStatus.value[index].imei)
      devicesStatus.value[index].batteryVoltage = devicesGeneralData.value.batteryVoltage
      devicesStatus.value[index].batteryCurrent = devicesGeneralData.value.batteryCurrent
      devicesStatus.value[index].externalVoltage = devicesGeneralData.value.externalVoltage
      devicesStatus.value[index].GSMSignal = devicesGeneralData.value.GSMSignal
      devicesStatus.value[index].satellites = devicesGeneralData.value.satellites
      devicesStatus.value[index].GNSSStatus = devicesGeneralData.value.GNSSStatus
    } 

    const defaultValue = { IPAddress: "-",imei: "-",indicator: 0,lastHandshake: "-",port: "-",status: "OFFLINE",_measurement: "-",_time: "-", batteryVoltage: "-", GSMSignal: 0,batteryCurrent: "-",externalVoltage:'-'}
    mergedList.value = devicesList.value.map(device => {
      const tcpStatusData = devicesStatus.value.find(status => status.imei === device.IMEINumber) || defaultValue
      return { ...device, ...tcpStatusData }
    })
    console.log(mergedList.value, 'Fine Data')
  }

  const delay = require('delay')
  const whileState = ref(true)

  onBeforeMount( async () => {
    loading.value = true
    await devicesStore.loadDevices()
    await getDevicesList()
    loading.value = false
    while (whileState.value) {
      await getDevicesList()
      await delay(10000)
    }
  })

  onUnmounted(() => {
    whileState.value = false
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