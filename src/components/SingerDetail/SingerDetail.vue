<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../music-List/music-list.vue'
  import {getSingerDetail} from '../../api/singer'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        songs: []
      }
    },
    computed: {
      bgImage () {
        return this.singer.img
      },
      title () {
        return this.singer.name
      },
      ...mapGetters(['singer'])
    },
    created () {
      this._getDetail()
    },
    methods: {
      _getDetail () {
        if (!this.singer.singerId) {
          this.$router.push('/musicBox')
          return
        }
        getSingerDetail(this.singer.singerId).then(res => {
          if (res.errnum === 0) {
            this.songs = res.data
          }
        })
      }
    },
    components: {
      MusicList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%,0,0)
</style>
