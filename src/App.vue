<template>
  <div id="app">
    <keep-alive>
      <router-view :bgImg="bgImg"></router-view>
    </keep-alive>
    <player></player>
    <transition name="fade">
      <div v-show="loaderShow" class="loader-wrapper">
        <div class="wave"></div>
        <div class="floor">
          <div class="text-wrapper">
            <span class="name"><logo-L height="34" color="#fff"></logo-L></span><span class="say">你好哇!</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import player from './components/player/player.vue'
  import logoL from './base/logo_L/logo_L.vue'
  import {getMImg} from './api/bgImg'
  export default {
    name: 'app',
    data () {
      return {
        loaderShow: true,
        bgImg: {}
      }
    },
    created () {
      getMImg().then((res) => {
        let result = JSON.parse(res)
        if (result.code !== 0) {
          console.log('getMImg错误')
          return
        }
        this.bgImg = result.data
        setTimeout(() => {
          this.loaderShow = false
        }, 1000)
      })
    },
    components: {
      player,
      'logo-L': logoL
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loader-wrapper
    position :fixed
    left :0px
    top: 0px
    width: 100%
    height: 100%
    z-index:50
    background-color:#1f1e1d
    &.fade-enter-active,&.fade-leave-active
      transition: all 0.5s
    &.fade-enter,&.fade-leave-to
      opacity :0
    .wave
      position: relative
      width: 100%
      height: 100%
      background-color: #1EE494
      overflow: hidden
      &::before,&::after
        content: ""
        position: absolute
        width: 750px
        height: 750px
        top: -600px;
        left: -50%;
        background-color: rgba(31, 30, 29, .4)
        border-radius: 45%
        transform: translate(-50%, -70%) rotate(0)
        animation: rotate 6s linear -5s infinite
        z-index: 10
      &::after
        border-radius: 47%
        background-color: rgba(31, 30, 29, .9)
        transform: translate(-50%, -70%) rotate(0)
        animation: rotate 10s linear -5s infinite
        z-index: 20


    .floor
      position :absolute
      bottom :0px
      left :0px
      width: 100%
      height: 90px
      background-color: #fff
      .text-wrapper
        width: 100%
        height:100%
        padding-left: 20%
        padding-top:10px
        .name
          display :inline-block
          width: 40px
          height: 40px
          padding:8px
          border-radius :6px
          background-color: #1EE494
          font-family "Meiryo UI"
          font-size: 40px
          margin-right:20px
        .say
          display :inline-block
          color :#c0c0c0
          font-size: 18px


    @keyframes rotate{
      50%{
        transform: translate(-50%, -73%) rotate(180deg)
      }
      100%{
        transform: translate(-50%, -70%) rotate(360deg)
      }
    }
</style>
