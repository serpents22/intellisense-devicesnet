<template>
  <router-view/>
</template>

 <script>
export default {
  name: 'App',
	watch: {
		'$route' (to, from) {
			document.title = to.meta.title || 'IntelliSense'
		}
	}
}
</script>

<style>
:root {
  position:relative;
  /* padding-bottom: 160px; */
  margin: 0;
  background: white;
  /* background: #F7F8FA; */
}


#app {
  position:relative;
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  padding: 60px 20px 60px 60px;
}

body {
  position:relative;
  margin: 0;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}


body::-webkit-scrollbar {
  width: 8px;
}
 
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
</style>
