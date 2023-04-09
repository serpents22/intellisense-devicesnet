<template>
  <div class="card">
    <div class="flex justify-between items-start">
      <Indicator :status="loading"/>
      <div class="flex flex-col gap-2 items-start text-sm m-4">
        <p class="text-left font-medium ">AVL ID</p>
        <input type="number" placeholder="Input AVL ID" v-model="avlID">
      </div>
      <div class="flex flex-col gap-2 items-start text-sm m-4">
        <p class="text-left font-medium ">Data ID</p>
        <input type="number" placeholder="Input Data ID" v-model="dataID">
      </div>
      <div class="close-btn cursor-pointer" @click="emits('close')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM15.6 17L12 13.4L8.4 17L7 15.6L10.6 12L7 8.4L8.4 7L12 10.6L15.6 7L17 8.4L13.4 12L17 15.6L15.6 17Z" fill="#7C7C7C"/>
        </svg>
      </div>
    </div>
    <div class="flex gap-2 items-center mx-4 mb-4 h-[80px]">
      <div class="w-[6px] h-[52px] bg-[#D3E6FA] rounded-full"></div> 
      <p class="text-[#2482E6] text-[24px] font-bold">{{ localCANData.dataValue }}</p>
    </div>
  </div>
</template>
  
<script setup>
import { debounce } from 'lodash';
import { ref, watch, defineEmits, onUnmounted } from 'vue'
import dataAPI from '@/services/dataAPI'
import Indicator from '@/components/Indicator.vue'


const dataID = ref()
const avlID = ref()
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  index: null
});

const emits = defineEmits(['close'])
const loading = ref(false)
const localCANData = ref({
  dataID:null,
  dataValue: '-'
})
  
const getCANData = async (imei, avlId, dataId) => {
  const params = ref({
    imei:imei,
    avlId:avlId,
    enableDecode:true,
    maskingBit:'65535',
    dataId: dataId
  }) 
  try { 
    const res = await dataAPI.getLast(params.value)
    localCANData.value.dataID = res.data.dataId
    localCANData.value.dataValue = res.data.data.decodedData
    console.log(localCANData.value)
    return res
  } catch (err) { 
    console.error(err)
    localCANData.value.dataID = '-'
    localCANData.value.dataValue = 'No Data'
    console.log(localCANData.value)
    return err
  } 
}

const getCANDataInterval = ref(null)


function getLastCANData() {
  getCANData(props.id,avlID.value,dataID.value)
}

watch(dataID, debounce((newValue) => {
  console.log(newValue)
  if (newValue != '') {
    loading.value = true
    getLastCANData()
    if (getCANDataInterval.value === null) {
      getCANDataInterval.value = setInterval(getLastCANData, 4000)
    }
  } else if (newValue === '') {
    loading.value = false
    clearInterval(getCANDataInterval.value)
    getCANDataInterval.value = null
  }
}, 1000)) 

onUnmounted(() => {
  clearInterval(getCANDataInterval.value)
  getCANDataInterval.value = null
})
  
</script> 

<style scoped>
.card {
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  @apply 
  flex flex-col min-w-full p-2 rounded-lg h-fit gap-0 !important
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
  