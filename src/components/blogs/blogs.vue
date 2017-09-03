<template>
  <div class="blogs">
    <div class="head-wrapper">
      <div class="head">
        <div @click="back" class="back"><i class="icon-home"></i></div>
        <div  class="menu"><i @click="openSelecter" class="icon-music_list_menu"></i></div>
      </div>
    </div>
    <div class="classification-wrapper">
      <h2 class="classification">ALL</h2>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <ul>
          <li @click="showArticle" class="item">
            <div class="img-wrapper">
              <img src="./liTestImg.png" class="img">
            </div>
            <div class="content-text">
              <h2 class="title">标题</h2>
              <div class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
              <div class="desc">
                <span class="time">2017/9/2</span>
                <span class="views">
                  <i class="icon-icon-views"></i>
                  <span class="number">20</span>
                </span>
              </div>
            </div>
          </li>
          <li class="item">
            <div class="img-wrapper">
              <img src="./liTestImg.png" class="img">
            </div>
            <div class="content-text">
              <h2 class="title">标题</h2>
              <div class="text">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</div>
              <div class="desc">
                <span class="time">2017/9/2</span>
                <span class="views">
                  <i class="icon-icon-views"></i>
                  <span class="number">20</span>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <transition name="fade">
      <div v-show="selecterShow" class="selecter-wrapper">
        <div class="heard">
          <div @click="closeSelecter" class="close"><i class="icon-close"></i></div>
        </div>
        <div class="title"><i class="icon-menu"></i></div>
        <div class="selecter">
          <ul>
            <li class="selecter-item selected">.net</li>
            <li class="selecter-item">javascript</li>
            <li class="selecter-item">数据库</li>
          </ul>
        </div>
      </div>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
        return {
          selecterShow: false
        }
      },
      methods: {
        back () {
          this.$router.push('/home')
        },
        openSelecter () {
          this.selecterShow = true
        },
        closeSelecter () {
          this.selecterShow = false
        },
        showArticle () {
          this.$router.push({path: '/blogs/123'})
        }
      },
      computed: {
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/mixin.styl"
  .blogs
    .head-wrapper
      width: 100%
      height: 200px
      background :url("./logTopBakcground.jpg")
      background-size :cover
      .head
        width 100%
        height: 50px
        display :flex
        color :#d0d0d0
        .back
          flex :1
          text-align :left
          font-size:24px
          padding :10px
          .icon-home
            padding :10px
            width:24px
        .menu
          flex :1px
          text-align :right
          font-size:24px
          padding :10px
          .icon-music_list_menu
            padding:10px
            padding :10px
    .classification-wrapper
      width:100%
      box-sizing :border-box
      padding :20px 0 0 20px
      .classification
        font-size: 24px
        color :#000
        font-weight :600
    .content-wrapper
      padding:20px
      box-sizing :border-box
      width:100%
      .content
        width :100%
        .item
          width: 100%
          height:130px
          display :flex
          margin-bottom:20px
          .img-wrapper
            flex :0 0 130px
            height:100%
            .img
              width:100%
              height:100%
          .content-text
            padding-left:25px
            flex :1
            .title
              display :block
              color :#434648
              font-size: 18px
              height:18px
              font-weight:600
              margin-bottom:16px
            .text
              color :#969494
              font-size: 10px
              height:30px
              width:100%
              margin-bottom:50px
            .desc
              display :flex
              height: 8px
              width:100%
              color :#969494
              font-size:8px
              .time
                flex :1
                text-align :left
              .views
                flex :1
                text-align :right




    .selecter-wrapper
      position :fixed
      top: 0
      left :0
      right :0
      bottom :0
      background-color: #fff
      padding :0 35px 0 35px
      &.fade-enter-active,&.fade-leave-active
        transition:all 0.5s
      &.fade-enter,&.fade-leave-to
        opacity :0
      .heard
        position: relative
        width: 100%
        box-sizing :border-box
        height: 30px
        padding: 10px
        margin-bottom:100px
        .close
          position :absolute
          right :0px
          margin-right:-25px
          top :10px
          width: 20px
          height: 20px
          padding:15px
          .icon-close
            font-size: 20px
            line-height :20px
            color :#000

      .title
        width: 100%
        height: 10px
        margin-bottom:80px
        .icon-menu
          color :#000
          font-size:10px
          line-height :10px
      .selecter
        width:100%
        color :#000
        .selecter-item
          font-size:20px
          font-size:20px
          font-weight :500
          margin-bottom:30px
          &.selected
            position :relative
            &::before
              position :absolute
              top: 7px
              left :-15px
              width: 4px
              height: 4px
              border :2px solid #ea6262
              border-radius :50%
              content :' '

</style>
