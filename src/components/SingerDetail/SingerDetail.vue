<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../music-List/music-list.vue'
  import {getSongForSinger} from '../../api/song'
  import {mapGetters} from 'vuex'
  import {createSongListForData} from '../../common/js/song'
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
        if (!this.singer.id) {
          this.$router.push('/musicBox')
          return
        }
        getSongForSinger(this.singer.id).then(res => {
          let result = JSON.parse(res)
          if (result.code !== 0) {
            console.log('getSongForSinger错误')
            return
          }
          this.songs = createSongListForData(result.data, this.singer)
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
