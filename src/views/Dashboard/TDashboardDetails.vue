<template>

    <sideNav :isDataActive="true" />
    <div class="content">
      <div class="device-container">
        <h1 class="title"> Data Monitoring </h1>
        <div class="card-wrapper">
          <h1 class="text-xl text-left font-semibold mb-4"> General Data </h1>
          <div class="device-info bg-[#F7F7F7] rounded-lg w-full py-5 px-10 grid grid-cols-4">
            <div class="field-wrapper flex flex-col gap-3 sm:gap-6">
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">IMEI Number:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.IMEINumber }}</p>
              </div>
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">GSMS ignal:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.GSMSignal }}</p>
              </div>
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">Data Mode:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.dataMode }}</p>
              </div>
            </div>
            <div class="field-wrapper flex flex-col gap-3 sm:gap-6">
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">Speed:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.speed }}</p>
              </div>
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">External Voltage:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.externalVoltage }}</p>
              </div>
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">Battery Voltage:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.batteryVoltage }}</p>
              </div>
            </div>
            <div class="field-wrapper flex flex-col gap-3 sm:gap-6">
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">Battery Current:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.batteryCurrent }}</p>
              </div>
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">GNSSS tatus:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.GNSSStatus }}</p>
              </div>
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">GNSS PDOP:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.GNSSPDOP }}</p>
              </div>
            </div>
            <div class="field-wrapper flex flex-col gap-3 sm:gap-6">
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">Sleep Mode:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.sleepMode }}</p>
              </div>
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">Ignition:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.ignition }}</p>
              </div>
              <div class="text-wrapper flex flex-col gap-2 text-left">
                <p class="text-[#353535]/60 text-sm">Movement:</p>
                <p class="text-[#353535] text-base">{{ devicesGeneralData.movement }}</p>
              </div>
            </div>
          </div>
        </div> 
        <div class="card-wrapper">
          <h1 class="text-xl text-left font-semibold mb-4"> CAN Data </h1>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
            <DynamicCard v-for="(card,index) in numOfCard" :key="index" :id="props.id" :CANData="CANData[index]"
              @close="decCard(index)"  
              @updateParams="(avlID, dataID) => handleUpdateParams(index, avlID, dataID)"  />

            <DynamicCardDummy @click="incCard()" />
          </div>
        </div>
    </div>
    </div>
</template>
  
<script setup>
import DynamicCardDummy from '@/components/card/DynamicCardDummy.vue'
import DynamicCard from '@/components/card/DynamicCard.vue'
import sideNav from '@/components/navigation/sideNav.vue'
import { ref, onBeforeMount, onUnmounted } from 'vue';
import { useRealtimeDataStore } from '@/stores/RealtimeDataStore'
import { useCANDataStore } from '@/stores/CANDataStore'
import { storeToRefs  } from 'pinia'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
const loading = ref(false)
const canDataStore = useCANDataStore()
const realtimeDataStore = useRealtimeDataStore()
const { devicesGeneralData } = storeToRefs(useRealtimeDataStore())
const numOfCard = ref(0)
const CANData = ref([])
const avlParams = ref([])
const delay = require('delay')
const whileState = ref(true)

onBeforeMount( async () => {
  loading.value = true
  await realtimeDataStore.getGeneralData(props.id)
  console.log(devicesGeneralData.value)
  loading.value = false
  // while (whileState.value) {
  //   console.log(avlParams.value)
  //   await realtimeDataStore.getGeneralData(props.id)
  //   await delay(10000)
  // }
})

async function handleUpdateParams(index,avlID, dataID) {
  let temp = {[avlID] : dataID}
  avlParams.value[index] = temp
  console.log(avlParams.value)
  while (whileState.value) {
    const res = await canDataStore.getCANDatas(props.id, avlParams.value)
    CANData.value = res.map((data) => { 
      if (typeof(data.data[0]) === 'undefined') {
        return 'No Data'
      }
      return data.data[0].AVLValue
    })
    await delay(10000)
  }
}

onUnmounted(() => {
  whileState.value = false
})




function incCard() {
  // inc.value = inc.value + 1
  // numOfCard.value.push(`${inc.value}`)
  // console.log(numOfCard.value)
  numOfCard.value = numOfCard.value + 1
  console.log(numOfCard.value)
}
function decCard(index) {
  numOfCard.value = numOfCard.value - 1
  console.log(numOfCard.value)
  // numOfCard.value.splice(index,1)
  avlParams.value.pop()
  // console.log(numOfCard.value)
}

</script>

<style scoped>


.content {
  @apply w-full h-fit relative
}
.device-container {
  @apply 
    pl-[32px] pb-[32px] flex flex-col gap-12 pt-[32px]
}
.title {
  @apply
    text-[28px] font-thin flex justify-start items-center text-[#353535] opacity-80
}
.card-wrapper {
  @apply
    flex flex-col 
}
.card {
  @apply 
  flex flex-col gap-4 w-fit
}

input {
  @apply
  p-3 font-medium bg-transparent focus:outline-none w-32 text-sm
  border-solid border rounded-lg

} 

input::placeholder {
  @apply text-sm font-medium text-[#9A9EA4] 
} 
  </style>