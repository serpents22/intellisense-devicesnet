<template>
    <sideNav :isMapsActive="true" />
    <div class="tab-wrapper">
      <Tab :tabs="tabs" @clicked= "changeNavigation" />
    </div>
    <component :is="selectedComponent" />

  </template>
  
  <script >
    import Tab from '@/components/tab/Tab.vue';
    import sideNav from '@/components/navigation/sideNav.vue'
    import RealtimeMap from '@/views/Map/RealtimeMap.vue'
    import RouteMap from '@/views/Map/RouteMap.vue'
    import { onMounted, ref} from 'vue'

    export default {
      components:{
        RealtimeMap,
        RouteMap,
        Tab,
        sideNav 
    },

    setup() {
      const selectedComponent = ref('RealtimeMap')
      const tabs = [
        {
          title: 'Realtime Tracking',
          value: 'RealtimeMap'
        },
        {
          title: 'Route Tracking',
          value: 'RouteMap'
        }
      ]
 
      function changeNavigation(navigation) {
        var subNavs = document.getElementsByClassName("nav")
        console.log(subNavs)
        for (var i of subNavs) {
          i.classList.remove("active");
        }
        console.log(navigation)
        event.target.className += " active"
        selectedComponent.value = navigation
      }

      onMounted(async() => {
        var element = document.getElementById("Realtime Tracking");
        element.classList.add("active");
      })
      
      return {
        selectedComponent, changeNavigation, tabs
      }
    }
  }

  </script>
  
  <style scoped>
.tab-wrapper{
  @apply
    absolute left-[80px] bottom-[20px] w-fit z-50
}

  </style>