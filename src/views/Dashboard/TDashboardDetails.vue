<template>

    <sideNav :isDataActive="true" />
    <div class="content">
      <div class="device-container">
        <h1 class="title"> Data Monitoring </h1>
        <div class="card-wrapper">
          <h1 class="text-xl text-left font-semibold mb-8"> CAN Data </h1>
          <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 ">
            <DynamicCard v-for="card in numOfCard" :id="props.id" @close="decCard" />
            <DynamicCardDummy @click="incCard" />
          </div>
        </div>
      </div> 
    </div>
</template>
  
<script setup>
import DynamicCardDummy from '@/components/card/DynamicCardDummy.vue'
import DynamicCard from '@/components/card/DynamicCard.vue'
import sideNav from '@/components/navigation/sideNav.vue'
import Button from '@/components/button/BaseButton.vue'
import { ref } from 'vue';
import { useCANDataStore } from '@/stores/CANDataStore'
import { useRoute } from 'vue-router';

 const canDataStore = useCANDataStore()

 const route = useRoute()
 const dataID = ref([])
 const getCANDataInterval = ref(null)
 const props = defineProps({
    id: {
      type: String,
      required: true
    }
  });

const numOfCard = ref(0)

function incCard() {
  numOfCard.value = numOfCard.value + 1
}
function decCard() {
  numOfCard.value = numOfCard.value - 1
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
  /* box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25); */
  @apply
    rounded-md bg-white
    flex flex-col 
    /* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5  */
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