<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import player from './components/player/player.vue'

  export default {
    name: 'app',
    components: {
      player
    }
  }
</script>

<style>
  /*@import "common/stylus/variable.styl";*/
</style>
