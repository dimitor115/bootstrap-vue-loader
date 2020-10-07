<template>
  <div id="app">
    <img alt="Vue logo" src="src/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <b-card header="NANANAN">XD
      <b-button v-b-popover.hover="'I am popover content!'" title="Popover Title"></b-button>
    </b-card>
    <b-button v-b-tooltip.hover title="Tooltip content">NANANAN</b-button>
    <div>
      <b-nav pills>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Link</b-nav-item>
        <b-nav-item-dropdown
                id="my-nav-dropdown"
                text="Dropdown"
                toggle-class="nav-link-custom"
                right
        >
          <b-dropdown-item>One</b-dropdown-item>
          <b-dropdown-item>Two</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>Three</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
