<template>
<alert 
  :message ="status.message"
  :modalActive="modalActive"
  :isError="isError"
  @close="closeNotification" />
<sideNav :isDevicesActive="true" />
<div class="content">
  <div class="content-header">
    <div class="title-wrapper flex gap-6 items-center">
      <div class="button-wrapper">
        <Button type="button" class="outlined" label="Back" @click="goBack" />
      </div>
      <h1 class="title"> Device Information </h1>
    </div>
    <div class="button-wrapper">
      <Button type="button" class="filled__blue" :label="editLabel" @click="editAction" />
    </div>
  </div> 
  <component :is="selectedComponent" :id="deviceId" @updated="updated" />
  <!-- <div class="table-wrap">
    <EasyDataTable
    table-class-name="customize-table"
    :headers="header"
    :items="[deviceData]"
    theme-color="#1363df"        
    />
  </div> -->
</div>

</template> 
     
<script>
import DeviceInfo from '@/views/Devices/DeviceInfo.vue'
import EditDevice from '@/views/Devices/EditDevice.vue'
import sideNav from '@/components/navigation/sideNav.vue'
import Button from '@/components/button/BaseButton.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useDevicesStore } from '@/stores/DevicesStore'
import { useDataStore } from '@/stores/DataStore'
import { useRealtimeDataStore } from '@/stores/RealtimeDataStore'
import { storeToRefs } from 'pinia'
import { onBeforeMount, onUnmounted, ref } from 'vue'
import router from '@/router'

  export default {
    
    components: {
      DeviceInfo, EditDevice, sideNav, Button, SearchBar
    },
    props: ['id'],

    setup(props) {
      const deviceId = props.id
      const header = [
        { text: "Timestamp", value: "IMEINumber" },
        { text: "IMEI", value: "deviceName", sortable: true },
        { text: "Status", value: "status", sortable: true },
        { text: "IP Address", value: "ipAddress", sortable: true },
        { text: "Port", value: "port", sortable: true },
        { text: "Last Handshake", value: "lastHandshake", sortable: true },
        { text: "", value: "operation", width: 100 },
      ]

      const devicesStore = useDevicesStore()
      const { deviceData, status } = storeToRefs(useDevicesStore())
      const dataStore = useDataStore()
      const { historicalData } = storeToRefs(useDataStore()) 
      const selectedComponent = ref('DeviceInfo')
            
      const historicalParams = ref({
        imei: props.id,
        startTime: '2023-04-03T04:40:44.904Z',
        endTime: '2023-04-03T04:48:44.904Z',
        avlId: '66',
        enableDecode: false,
        maskingBit: '65536',
        dataId: '65536'
      })

      const getHistoryData = async () => {
        await dataStore.getHistoricalData(historicalParams.value)
        console.log(historicalData.value)
      }



      const editLabel = ref('Edit Information')
      const editClick = ref(0)
      const cancelButtonClick = ref(0)

      function editAction() {
        editClick.value = ++editClick.value
        switch (editClick.value) {
          case 1:
            editLabel.value = 'Cancel'
            selectedComponent.value = 'EditDevice'
            break;
          case 2:
            cancelForm()
            break;
          case 3:
            cancelForm()
            break;
        }
      }

      function cancelForm() {
        cancelButtonClick.value = ++cancelButtonClick.value
        switch (cancelButtonClick.value) {
          case 1:
            editLabel.value = 'The entered data will be lost!'
            break;
          case 2:
            editLabel.value = 'Edit Information'
            selectedComponent.value = 'DeviceInfo'
            editClick.value = 0
            cancelButtonClick.value = 0
            break;
        }
      }
    
      const isError = ref(false)
      const modalActive = ref(false)

      function updated() {
        if (status.value.state == true ) {
          isError.value = true
          setTimeout(closeNotification, 3000)
        } else {
          selectedComponent.value = 'DeviceInfo'
          isError.value = false
          setTimeout(closeNotification, 3000)
        }
        modalActive.value = true
        editLabel.value = 'Edit Information'
        editClick.value = 0
        cancelButtonClick.value = 0
      }
      const closeNotification = () => {
        modalActive.value = false
      }
      const goBack = () => {
        router.go(-1);
      }

      
      return {
        selectedComponent, devicesStore, deviceData, deviceId, header, editAction, editLabel, updated, modalActive, isError, closeNotification, status, goBack
      }
    }
  }
  
</script>
    
  <style scoped>
.content {
  @apply w-full h-fit px-5 py-[32px] pt-[46px]
}
  .title {
    @apply
      text-[28px] font-normal flex justify-start items-center text-[#353535] opacity-80
  }
  .table-wrap {
    @apply
      h-[300px] py-[15px] mt-[5px]
      overflow-auto sm:overflow-visible
  }
  .content-header {
    @apply
    flex flex-row w-full justify-between mb-[30px] items-center
  }
  
  .customize-table {
    cursor: pointer;
    --easy-table-header-font-size: 14px;
    --easy-table-header-background-color: #F7F7F7;
    --easy-table-header-font-color:	#3A3A3E;
    /* --easy-table-row-border:	1px solid #D2DDEE; */
    --easy-table-header-height:	40px;
  
    --easy-table-body-row-font-size:	14px;
    --easy-table-body-font-color:	#3A3A3E;
    --easy-table-body-row-height:	46px;
  
    --easy-table-footer-font-size:	12px;
    --easy-table-footer-height:	40px;
    --easy-table-footer-font-color:	#3A3A3E;
  }
    </style>