<template>
  <div class="player" v-if="playList.length>0">
    <transition name="normal">
      <div class="normalPlayer">
        <div class="background">
          <img  width="100%" height="100%" :src="currentSong.imgUrl">
        </div>
        <div class="top">
          <div class="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="songName">{{currentSong.name}}</h1>
          <h2 class="singerName">{{currentSong.singer.name}}</h2>
        </div>
        <div class="middle">
          <div class="middle-content">
            <div class="cd-wrapper">
              <div class="cd-tray" :class="cdClass">
                <img :src="currentSong.imgUrl" class="img">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <div class="proguress-bar-wrapper">
              <proguress-bar :percent="percent" @percentChange="onProgressBarChange" ></proguress-bar>
            </div>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-music_list_loop"></i>
            </div>
            <div class="icon i-left">
              <i @click="prev" class="icon-music_left_button"></i>
            </div>
            <div class="icon i-center">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right">
              <i @click="next" class="icon-music_right_button"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-music_not_like"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import proguressBar from '../../base/proguress-bar/proguress-bar.vue'
  import * as types from '../../store/mutation-types'
  export default {
    computed: {
      percent () {
        return this.currentTime / this.currentSong.duration || 0
      },
      cdClass () {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon () {
        return this.playing ? 'icon-music_pause_button' : 'icon-music_play_button'
      },
      ...mapGetters([
        'playList',
        'playing',
        'singer',
        'currentSong',
        'currentIndex'
      ])
    },
    data () {
      return {
        songReady: false,
        currentTime: 0
      }
    },
    created () {
    },
    methods: {
      ready () {
        this.songReady = true
      },
      error () {
      },
      updateTime (e) {
        this.currentTime = e.target.currentTime
      },
      end () {
      },
      onProgressBarChange (percent) {
        let currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
      },
      togglePlaying () {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing)
      },
      prev () {
      },
      next () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1
        console.log(this.currentIndex)
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      ...mapMutations({
        'setPlayingState': types.SET_PLAYING,
        'setCurrentIndex': types.SET_CURRENT_INDEX
      })
    },
    watch: {
      currentSong (newSong, oldSong) {
        if (!newSong.musicId) {
          return
        }
        if (oldSong && newSong.musicId === oldSong.musicId) {
          return
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
          newSong.duration = this.$refs.audio.duration | 0
        }, 1000)
      },
      playing (newPlaying) {
        const audio = this.$refs.audio
        if (!audio) {
          return
        }
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    components: {
      'proguress-bar': proguressBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .player
    .normalPlayer
      position: fixed
      top: 0px
      left: 0px
      bottom: 0px
      right: 0px
      background: #222;
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
      .top
        position :relative
        margin-bottom :25px
        .back
          position :absolute
          padding :9px
          left :6px
          top :0px
          transform-origin :50% 50%
          transform: rotateZ(-90deg)
          .icon-back
            font-size :22px
            display :block
            color :$color-text
        .songName
          display :block
          font-size :$font-size-large
          line-height :40px
          width :70%
          margin : 0 auto
          text-align :center
        .singerName
          display :block
          font-size :$font-size-medium
          text-align :center
          line-height :20px

      .middle
        position :fixed
        top: 85px
        bottom :170px
        width: 100%
        .middle-content
          position :relative
          width :100%
          height :0px
          padding-top :80%
          .cd-wrapper
            position :absolute
            left 10%
            top:0
            width :80%
            height :100%
            .cd-tray
              width :100%
              height :100%
              box-sizing: border-box;
              border: 10px solid hsla(0,0%,100%,.1);
              border-radius: 50%;
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state :paused
            .img
              width :100%
              height :100%
              border-radius: 50%




      .bottom
        position:absolute
        bottom :50px
        width:100%
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .proguress-bar-wrapper
            flex :1
        .operators
          display :flex
          align-items: center
          .icon
            flex:1
            i
              font-size :30px
          .i-left
            text-align :right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size :40px
          .i-right
            text-align :left
  @keyframes rotate
    0%
      transform : rotate(0)
    100%
      transform: rotate(360deg)
</style>
