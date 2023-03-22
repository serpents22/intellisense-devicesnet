<template>
<!-- <alert 
message ="test"
:modalActive="modalActive"
:isError="isError"
 @close="closeNotification" /> -->
  <div class="device-info bg-[#F7F7F7] rounded-lg w-full py-5 px-10">
    <VeeForm :validation-schema="schema" v-slot="{ handleSubmit }" as="div" ref="form" >
      <form  @submit="handleSubmit($event, onSubmit)" class="form-wrapper" >
        <div class="text-wrapper flex flex-col gap-6 text-left w-full">
          <BaseInput v-model="deviceData.name" name="deviceName" type="text" placeholder="What would you like to call this device" class="outlined" label="Device Name"/>
          <BaseInput v-model="deviceData.name" name="deviceType" type="text" placeholder="Categorize your device" class="outlined" label="Device Type"/>
          <BaseInput v-model="deviceData.imei" name="imeiNumber" type="text" placeholder="Enter your device IMEI here" class="outlined" label="IMEI Number"/>
        </div>
        <div class="text-wrapper flex flex-col gap-6 text-left w-full">
          <BaseInput v-model="deviceData.imei" name="simNumber" type="number" placeholder="Enter your SIM number here" class="outlined" label="SIM Number"/>
          <BaseInput v-model="deviceData.name" name="simInfo" type="link" placeholder="Enter your SIM information here" class="outlined" label="SIM Information"/>
        </div>
        <div class="text-wrapper flex flex-col justify-between text-left w-full">
          <TextArea v-model="deviceData.name" name="notes" placeholder="Write notes for this device" class="outlined" label="Notes"></TextArea>
          <div class="flex justify-between gap-10">
            <BaseButton type="submit" class="filled__blue" :label="registerLabel" :loading="isLoading"  />
          </div>
        </div> 
      </form>
    </VeeForm>
  </div>
</template>
       
<script setup>

import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import { Form as VeeForm } from 'vee-validate'
import { updateDeviceSchema } from '@/composable/devicesSchema'
import { onBeforeMount, ref } from 'vue';
import BaseInput from '@/components/input/BaseInput.vue'
import TextArea from '@/components/input/TextArea.vue'
import BaseButton from '@/components/button/BaseButton.vue' 

  const props = defineProps({
    id: String
  })
  const schema = updateDeviceSchema
  const devicesStore = useDevicesStore()
  const { status, isLoading, deviceData } = storeToRefs(useDevicesStore())
  const isError = ref(false)
  const modalActive = ref(false)
  onBeforeMount( async () => {
    await devicesStore.loadDevice(props.id)
    console.log(deviceData.value)
      switch (deviceData.value.status) {
        case 0:
          deviceData.value.status = 'Offline'
          deviceData.value.indicator = 0
        break;
        case 1:
          deviceData.value.status = 'Online'
          deviceData.value.indicator = 1
        break;
        default:
          break;
      }
  })
  const registerLabel = ref('UPDATE')
  const regButtonClick = ref(0)
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time))
  const emits = defineEmits(['updated'])

  const onSubmit = async (values, { resetForm }) => {
    console.log(values)
    regButtonClick.value = ++regButtonClick.value
    if (regButtonClick.value == 1) {
      registerLabel.value = 'the data entered is correct?'
    }

    if (regButtonClick.value == 2) {
      await devicesStore.createDevices(values)
      emits('updated')
      registerLabel.value = 'UPDATE'
      regButtonClick.value = 0
      // modalActive.value = true

      // if (status.value.code == 'fail') {
      //   isError.value = true
      //   setTimeout(closeNotification, 3000)
      // } else {
      //   isError.value = false
      //   setTimeout(closeNotification, 3000)
      // }
    }
  }

  const closeNotification = () => {
    modalActive.value = false
  }


  
</script>
      
    <style scoped>
    
    .form-wrapper {
      @apply  flex flex-col sm:flex-row gap-3 sm:justify-between
    }
      </style>