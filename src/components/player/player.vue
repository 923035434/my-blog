<template>
  <div class="player" v-if="playList.length>0">
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div v-show="fullScreen" class="normalPlayer">
        <div class="background">
          <img  width="100%" height="100%" :src="imgUrl">
        </div>
        <div class="top">
          <div @click="back" class="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="songName">{{currentSong.name}}</h1>
          <h2 class="singerName">{{currentSong.singer.name}}</h2>
        </div>
        <div class="middle">
          <div class="middle-content">
            <div ref="cd_wrapper" class="cd-wrapper">
              <div class="cd-tray" :class="cdClass">
                <img :src="imgUrl" class="img">
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
            <div @click="changeMode" class="icon i-left">
              <i :class="iconMode"></i>
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
    <transition name="mini">
      <div @click="open" v-show="!fullScreen" class="miniPlayer_wrapper">
        <div class="miniPlayer"><i class="icon-icon-musicBox">
          <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span>
        </i></div>
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
  import {playMode} from '../../common/js/config'
  import {shuffle} from '../../common/js/Util'
  import velocity from 'velocity-animate'
  export default {
    computed: {
      iconMode () {
        return this.mode === playMode.sequence ? 'icon-music_list_loop' : this.mode === playMode.loop ? 'icon-music_one_loop' : 'icon-music_random'
      },
      percent () {
        return this.currentTime / this.currentSong.duration || 0
      },
      cdClass () {
        return this.playing ? 'play' : 'play pause'
      },
      playIcon () {
        return this.playing ? 'icon-music_pause_button' : 'icon-music_play_button'
      },
      imgUrl () {
        return this.currentSong ? this.currentSong.imgUrl : ''
      },
      ...mapGetters([
        'playList',
        'sequenceList',
        'playing',
        'singer',
        'currentSong',
        'currentIndex',
        'mode',
        'fullScreen'
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
      changeMode () {
        let mode = (this.mode + 1) % 3
        this.setPlayMode(mode)
        let list = null
        if (this.mode === playMode.random) {
          list = shuffle(this.sequenceList)
        } else {
          list = this.sequenceList
        }
        this.resetCurrentIndex(list)
        this.setPlayList(list)
      },
      resetCurrentIndex (list) {
        let index = list.findIndex((item) => {
          return item.musicId === this.currentSong.musicId
        })
        this.setCurrentIndex(index)
      },
      ready () {
        this.songReady = true
      },
      error () {
        this.songReady = true
      },
      updateTime (e) {
        this.currentTime = e.target.currentTime
      },
      end () {
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
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
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      next () {
        if (!this.songReady) {
          return
        }
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.togglePlaying()
        }
        this.songReady = false
      },
      loop () {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.setPlayingState = true
      },
      afterEnter () {
      },
      enter () {
      },
      afterLeave () {
        let cdWrapper = this.$refs.cd_wrapper
        cdWrapper.style.left = '10%'
        cdWrapper.style.top = '0'
        velocity(cdWrapper, {
          scale: 1
        })
      },
      leave () {
        let cdWrapper = this.$refs.cd_wrapper
        velocity(cdWrapper, {
          scale: 0.1,
          left: '45%',
          top: '100%'
        }, 500)
      },
      back () {
        this.setFullScreen(false)
      },
      open () {
        this.setFullScreen(true)
      },
      ...mapMutations({
        'setPlayingState': types.SET_PLAYING,
        'setCurrentIndex': types.SET_CURRENT_INDEX,
        'setPlayMode': types.SET_MODE,
        'setPlayList': types.SET_PLAY_LIST,
        'setFullScreen': types.SET_FULL_SCREEN
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
  @import "../../common/stylus/mixin.styl"
  .player
    .normalPlayer
      position: fixed
      top: 0px
      left: 0px
      bottom: 0px
      right: 0px
      background: #222;
      z-index :150
      &.normal-enter-active,&.normal-leave-active
        transition: all 0.5s
        .top, .bottom
          transition: all 0.3s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter,&.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
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
    .miniPlayer_wrapper
      position :fixed
      left :80%
      top :80%
      z-index: 180
      width :40px
      height:40px
      border:2px solid #c0c0c0
      border-radius :50%
      .miniPlayer
        position :absolute
        left :50%
        top :50%
        font-size :24px
        margin-left :-12px
        margin-top :-12px
        animation :rotate 10s linear infinite

  @keyframes rotate
    0%
      transform : rotate(0)
    100%
      transform: rotate(360deg)
</style>
