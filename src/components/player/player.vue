<template>
  <div class="player" v-if="playList.length>0">
    <transition name="normal">
      <div class="normalPlayer">
        <div class="background">
          <img  width="100%" height="100%" :src="currentSong.imgUrl">
        </div>
        <div class="top"></div>
        <div class="middle"></div>
        <div class="bottom"></div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'playList',
        'playing',
        'singer',
        'currentSong'
      ])
    },
    created () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .player
    .normalPlayer
      position: fixed
      top: 0px
      left: 0px
      bottom: 0px
      right: 0px
      background: #fff;
      z-index :150
      .background
        position :absolute
        left: 0
        top: 0
        z-index: -1
        width :100%
        height :100%
        opacity :0.6
        filter: blur(20px)
</style>
