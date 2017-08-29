<template>
  <div class="music-list">
    <div @click="back" class="back"><i class="icon-back"></i></div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div ref="filter" class="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" @scroll="scroll"
            :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
      <div class="song-list-wrapper">
          <div class="song-list">
            <ul>
              <li class="song-item" v-for="(song, index) in songs">
                <h2 class="name">{{song.name}}</h2>
                <p class="desc">{{getDesc(song)}}</p>
              </li>
            </ul>
          </div>
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import scroll from '../../base/scroll/scroll.vue'
import loading from '../../base/loading/loading.vue'
import {prefixStyle} from '../../common/js/dom'
const RESERVED_HEIGHT = 40
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop')
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
    bgImage: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle () {
      return 'background-image:url(' + this.bgImage + ')'
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    console.log(this.imageHeight)
    console.log(this.minTransalteY)
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    scroll (pos) {
      this.scrollY = pos.y
    },
    getDesc (song) {
      return song.singer.name + ' - ' + song.albumName
    },
    back () {
      this.$router.back()
    }
  },
  watch: {
    scrollY (newVal) {
      let translateY = Math.max(newVal, this.minTransalteY)
      let scale = 1
      let zIndex = 0
      let blur = 0
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
      }
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      if (newVal < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  },
  components: {
    scroll,
    loading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/index.styl"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background-color: #fff
    .back
      position :absolute
      left :6px
      top :0px
      z-index:50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-theme
      no-wrap()
    .bg-image
      position :relative
      width: 100%
      height :0px
      padding-top :70%
      background-size: cover
      transform-origin: top
      .filter
        position :absolute
        top :0px
        left :0px
        width: 100%
        height:100%
        background: rgba(7, 27, 20, 0.4)
    .bg-layer
      position: relative
      height: 100%
      width :100%
      background: #fff
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: #fff
      .song-list-wrapper
        padding: 20px 0 30px 20px
        .song-item
          align-items: center
          box-sizing: border-box
          height: 44px
          font-size: $font-size-medium
          margin-bottom:20px
          boder-1px(#dee6e3)
          .name
            color :#323534
          .desc
            color :#696d6a
            margin-top :4px
</style>
