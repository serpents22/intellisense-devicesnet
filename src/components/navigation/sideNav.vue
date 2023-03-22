<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="@/assets/img/mini-logo.png" alt="mini-logo" class="w-[45px] m-auto">
    </div>
    <div class="sidebar-body">
      <sideNavIcon  :isActive="isDevicesActive" :route="{name: 'DevicesList'}" menuName="Devices" path="M34.8 10.6097L21.05 3.08318C20.7285 2.90563 20.3673 2.8125 20 2.8125C19.6327 2.8125 19.2715 2.90563 18.95 3.08318L5.2 10.6113C4.85595 10.7996 4.56883 11.0768 4.36871 11.4141C4.16859 11.7514 4.06283 12.1363 4.0625 12.5285V27.4722C4.06283 27.8644 4.16859 28.2493 4.36871 28.5866C4.56883 28.9239 4.85595 29.2012 5.2 29.3894L18.95 36.9176C19.2716 37.0948 19.6328 37.1878 20 37.1878C20.3672 37.1878 20.7284 37.0948 21.05 36.9176L34.8 29.3894C35.1441 29.2012 35.4312 28.9239 35.6313 28.5866C35.8314 28.2493 35.9372 27.8644 35.9375 27.4722V12.5285C35.9375 12.136 35.8318 11.7508 35.6317 11.4132C35.4316 11.0757 35.1443 10.7981 34.8 10.6097ZM19.8438 4.72693C19.8897 4.70177 19.9413 4.68858 19.9937 4.68858C20.0462 4.68858 20.0978 4.70177 20.1437 4.72693L33.2047 11.8754L20 19.1004L6.79531 11.8754L19.8438 4.72693ZM6.09375 27.7457C6.04583 27.718 6.00611 27.6781 5.97866 27.6301C5.95121 27.582 5.937 27.5276 5.9375 27.4722V13.541L19.0625 20.7285V34.8441L6.09375 27.7457ZM33.8937 27.7457L20.9375 34.8441V20.7254L34.0625 13.5379V27.4691C34.0636 27.525 34.0496 27.5801 34.0221 27.6287C33.9947 27.6774 33.9546 27.7178 33.9062 27.7457H33.8937Z" />
      <sideNavIcon  :isActive="isDataActive" :route="{name: 'DevicesList'}" menuName="Data Analytics" path="M31.75 28.75H10.25V9.25C10.25 9.1125 10.1375 9 10 9H8.25C8.1125 9 8 9.1125 8 9.25V30.75C8 30.8875 8.1125 31 8.25 31H31.75C31.8875 31 32 30.8875 32 30.75V29C32 28.8625 31.8875 28.75 31.75 28.75ZM13 26.25H14.75C14.8875 26.25 15 26.1375 15 26V21.5C15 21.3625 14.8875 21.25 14.75 21.25H13C12.8625 21.25 12.75 21.3625 12.75 21.5V26C12.75 26.1375 12.8625 26.25 13 26.25ZM17.75 26.25H19.5C19.6375 26.25 19.75 26.1375 19.75 26V16C19.75 15.8625 19.6375 15.75 19.5 15.75H17.75C17.6125 15.75 17.5 15.8625 17.5 16V26C17.5 26.1375 17.6125 26.25 17.75 26.25ZM22.5 26.25H24.25C24.3875 26.25 24.5 26.1375 24.5 26V18.4375C24.5 18.3 24.3875 18.1875 24.25 18.1875H22.5C22.3625 18.1875 22.25 18.3 22.25 18.4375V26C22.25 26.1375 22.3625 26.25 22.5 26.25ZM27.25 26.25H29C29.1375 26.25 29.25 26.1375 29.25 26V13.5C29.25 13.3625 29.1375 13.25 29 13.25H27.25C27.1125 13.25 27 13.3625 27 13.5V26C27 26.1375 27.1125 26.25 27.25 26.25Z" />
    </div>
    <div class="sidebar-foot">
      
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore'
import { defineProps } from 'vue';
import sideNavIcon from '@/components/navigation/sideNavIcon.vue'
  
const props = defineProps({
  isDevicesActive: {
    type: Boolean,
    default: false
  },
  isMapsActive: {
    type: Boolean,
    default: false
  },
  isDataActive: {
    type: Boolean,
    default: false
  },
  isSettingActive: {
    type: Boolean,
    default: false
  }
}) 

  const authStore = useAuthStore();
  async function signOut() {
      await authStore.signOut();
  }
  const goBack = () => {
      router.go(-1);
  };
 
</script>

<style scoped>

.sidebar {
@apply 
  h-screen w-[60px] py-4
  bg-[#F2F2F7]
  fixed z-10 flex flex-col gap-10
  transition-all ease-in-out duration-200
  top-0 left-0
}
.sidebar-header {
@apply 
  p-1 
}

.sidebar-body {
  @apply 
    flex flex-col justify-center items-center gap-8
}
.sidebar-body img {
  @apply 
    h-8
}


 
</style>