<template>
  <transition name="slide">
    <div class="article">
      <div class="article-head-wrapper">
        <div class="head">
          <div @click="back" class="back"><i class="icon-back"></i></div>
          <div class="mini-title">
            <transition name="fade">
              <span class="text" v-show="showMiniTitle">{{selectBlog.title}}</span>
            </transition>
          </div>
          <div class="menu"></div>
        </div>
      </div>
      <div ref="titleDom" class="article-title">
        <h2 class="title">{{selectBlog.title}}</h2>
      </div>
      <div class="article-content">
        <scroll @scroll="contentScroll" :probeType="3" :listenScroll="true" class="content">
          <div v-html="selectBlog.content" class="content-text">
          </div>
        </scroll>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import scroll from '../../base/scroll/scroll.vue'
  import {prefixStyle} from '../../common/js/dom'
  const transform = prefixStyle('transform')
  const titleMinHeight = 37
  export default {
    props: {
      selectBlog: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        showMiniTitle: false
      }
    },
    created () {
      if (!this.selectBlog.id) {
        this.$router.push('/blogs')
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      contentScroll (pos) {
        let y = pos.y
        if (y < 0) {
          let translateY = Math.max(y, -titleMinHeight)
          let titleDom = this.$refs.titleDom
          titleDom.style[transform] = 'translate3d(0,' + translateY + 'px,0)'
          if (translateY === -titleMinHeight) {
            this.showMiniTitle = true
          } else {
            this.showMiniTitle = false
          }
        }
      }
    },
    components: {
      scroll
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/quill.snow.css"
  @import "~highlight.js/styles/monokai-sublime.css"
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/mixin.styl"
  .article
    position :fixed
    top: 0
    left :0
    right :0
    bottom :0
    z-index :50
    background-color: #fff
    padding-top :41px
    &.slide-enter-active,&.slide-leave-active
      transition:all 0.3s
    &.slide-enter,&.slide-leave-to
      transform :translate3d(100%,0,0)
    .article-head-wrapper
      position :fixed
      top :0
      left :0
      height:41px
      width:100%
      background-color: #fff
      z-index :100
      .head
        display :flex
        height:100%
        width:100%
        boder-1px(#d0d0d0)
        .back
          flex :0 0 41px
          height:100%
          padding: 8px
          box-sizing :border-box
          text-align :center
          .icon-back
            font-size: 24px
            width: 24px
            height: 24px
            line-height :24px
            color :#d0d0d0
        .mini-title
          flex :1
          height:100%
          font-size: 12px
          line-height :41px
          text-align :center
          padding :0 30px 0 30px
          color :#000
          .text
            &.fade-enter-active,&.fade-leave-active
              transition :all 0.4s
            &.fade-enter,&.fade-leave-to
              opacity :0
          no-wrap()
        .menu
          flex:0 0 41px
          height:100%
    .article-title
      padding:8px
      background-color: #fff
      border-bottom:5px solid #e0e0e0
      position :relative
      z-index :50
      .title
        font-size: 16px
        font-weight: 600
        text-align :center
        color :#000
    .article-content
      width: 100%
      height: 100%
      padding: 20px
      box-sizing :border-box
      background-color: #fff
      .content
        width: 100%
        height:100%
        color : #000
        .content-text
          background-color: #fff
          img
            width:100%
</style>
