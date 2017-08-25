<template>
  <div class="home">
    <scroll class="content-scroll" :click="true" >
        <div v-on:click="defaultClick" class="content-wrapper">
          <div class="header">
            <div class="top_bar">
              <span ref="menu" @click.stop="selectMenu" class="menu"><i class="icon-icon-menu"></i></span>
              <span v-if="false" class="share"><i class="icon-icon-share"></i></span>
            </div>
            <div class="user-content">
              <div class="avatar"></div>
              <div class="name">刘小先森。</div>
              <div class="message icon-icon-message">一个从朝阳行业转世投胎的小小程序员。</div>
              <div class="address icon-icon-address">广州</div>
              <div v-on:click="showMessage" class="btn_box">
                留言
              </div>
              <div class="data-wrapper">
                <div class="data-item">
                  <p class="item-name icon-icon-views">views</p>
                  <p class="number">12</p>
                </div>
                <div class="data-item">
                  <p class="item-name icon-icon-blogs">blogs</p>
                  <p class="number">100</p>
                </div>
                <!--<div class="data-item">-->
                  <!--<p class="item-name icon-icon-likes">likes</p>-->
                  <!--<p class="number">50</p>-->
                <!--</div>-->
              </div>
            </div>
            <transition name="fade">
              <div  @click.self="hiddenMessageBox" v-show="messageWrapperShow" class="message-board-wrapper">
                <transition name="slide">
                  <div ref="messageBox" v-show="messageBoxShow" class="message-board">
                    <div class="input-wrapper">
                      <div class="tab-name">Name</div>
                      <input type="text" placeholder="请输入你的姓名">
                    </div>
                    <div class="input-wrapper">
                      <div class="tab-name">Email</div>
                      <input type="text" placeholder="请输入你的邮箱">
                    </div>
                    <div class="textarea-wrapper">
                      <div class="tab-name">Message</div>
                      <textarea id="message-input" rows="4" name="message">

                      </textarea>
                    </div>
                  </div>
                </transition>
                <transition name="bounce">
                  <div @click.stop="showEnvelop" v-show="sendBtnShow" class="btn-send">
                    send
                  </div>
                </transition>
                <transition
                  v-on:before-enter = "senBeforeEnter"
                  v-on:enter = "sendEnter"
                  v-on:after-enter = "sendAfterEnter"
                >
                  <div v-show="envelopeShow" class="envelope">
                    <div ref="top" class="top">
                    </div>
                    <div class="envelope-surface">
                    </div>
                  </div>
                </transition>
              </div>
            </transition>
          </div>
        </div>
    </scroll>
    <transition
      v-on:before-enter="selectBeforeEnter"
      v-on:enter="selectEnter"
      v-on:leave="selectLeave"
      v-bind:css="false"
    >
      <div v-if="selectShow" class="select-wrapper">
        <div class="top">
          <div class="pig">
            <i class="icon-icon-pig">
              <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span>
            </i>
          </div>
        </div>
        <div class="selector-wrapper">
          <scroll class="select-scroll">
            <ul ref="select_ul">
              <li ref="link_blogs" @click="link('blogs')" class="selected select-item">
                      <span class="select-icon"><i class="icon-icon-box">
                <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span>
                </i></span><span class="text">只是一些微不足道的见解。</span>
              </li>
              <li ref="link_musicBox" @click="link('musicBox')" class="select-item">
                      <span class="select-icon"><i class="icon-icon-musicBox">
                <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span>
                </i></span><span class="text">只是一些我喜欢听的歌。</span>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from '../../base/scroll/scroll.vue'
  import velocity from 'velocity-animate'
  import {prefixStyle, addClass, removeClass} from '../../common/js/dom'

  const transform = prefixStyle('transform')
  const opacity = prefixStyle('opacity')

  export default {
    data () {
      return {
        messageWrapperShow: false,
        messageBoxShow: false,
        sendBtnShow: false,
        envelopeShow: false,
        selectShow: false
      }
    },
    created () {
    },
    methods: {
      showMessage () {
        this.messageWrapperShow = true
        this.messageBoxShow = true
        setTimeout(() => { this.sendBtnShow = true }, 500)
      },
      hiddenMessageBox () {
        this.messageWrapperShow = false
        this.messageBoxShow = false
        this.sendBtnShow = false
        this.envelopeShow = false
      },
      showEnvelop () {
        this.envelopeShow = true
      },
      senBeforeEnter (el) {
        el.style[transform] = 'scale(0.5)'
        this.sendBtnShow = false
        el.style[opacity] = 1
      },
      sendEnter (el, done) {
        let top = this.$refs['top']
        let messageBox = this.$refs['messageBox']
        velocity(el, { opacity: 1, scale: 1 }, { duration: 300 })
        velocity(messageBox, { rotateZ: '90deg', scale: 0.3 }, { duration: 300, complete: () => { velocity(messageBox, { bottom: '-3%', opacity: 0 }, { duration: 800, complete: () => { velocity(top, { rotateX: '180deg' }, { duration: 300, complete: () => { velocity(el, { translateX: '500px' }, { duration: 300, complete: done }) } }) } }) } })
       // this.resetMessageAll(el)
      },
      sendAfterEnter (el, done) {
        let top = this.$refs['top']
        let messageBox = this.$refs['messageBox']
//        top.style[transform] = 'rotateX(0deg)'
//        messageBox.style['opacity'] = 1
//        messageBox.style[transform] = 'rotateZ(0deg)'
//        messageBox.style['bottom'] = '30%'
//        el.style[transform] = 'translateX(0px)'
        this.hiddenMessageBox()
        velocity(top, { rotateX: '0deg' })
        velocity(messageBox, { opacity: 1, rotateZ: '0deg', scale: 1, bottom: '30%' })
        velocity(el, { opacity: 0, scale: 0.5 })
        velocity(el, { translateX: '0px' }, { complete: done })
      },
      selectMenu () {
        let menu = this.$refs['menu']
        addClass(menu, 'selected')
        this.selectShow = true
      },
      defaultClick () {
        this.selectShow = false
        let menu = this.$refs['menu']
        removeClass(menu, 'selected')
      },
      selectBeforeEnter (el) {
        el.style['left'] = '-100%'
      },
      selectEnter (el, done) {
        velocity(el, {left: 0}, {durasion: 400, complete: done})
      },
      selectLeave (el, done) {
        velocity(el, {left: '-100%'}, {durasion: 400, complete: done})
      },
      link (linkName) {
        let selectUl = this.$refs['select_ul']
        let selectName = 'link_' + linkName
        let selectItem = this.$refs[selectName]
        let list = selectUl.getElementsByTagName('li')
        for (let i = 0; i < list.length; i++) {
          removeClass(list[i], 'selected')
        }
        addClass(selectItem, 'selected')
        this.$router.push('/' + linkName)
      }
    },
    components: {
      scroll
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/variable.styl"
    .home
      position :absolute
      top :0px
      left :0px
      width: 100%
      height:100%
      overflow :hidden
      .content-scroll
        width :100%
        height:100%
        .content-wrapper
          width :100%
          .header
            background :url("topBackground.jpg") no-repeat
            background-position :center 0px
            width :100%
            height :667px
            position relative
            box-sizing :border-box
            .top_bar
              box-sizing :border-box
              position: relative
              color :#d0d0d0
              width:100%
              height:50px
              padding:10px
              .menu
                vitical-align:top
                display :inline-block
                width :30px
                height:30px
                &.selected
                  color: #4fc08d
                .icon-icon-menu
                  width: 100%
                  height :100%
                  font-size :30px
               .share
                position :absolute
                top :10px
                right :10px
                vitical-align:top
                display :inline-block
                width :30px
                height:30px
                .icon-icon-share
                  width: 100%
                  height :100%
                  font-size :30px
            .user-content
              box-sizing :border-box
              padding: 55px 19px 28px 19px
              width :94%
              height: 242px
              background: #fff
              position: absolute
              bottom 10px
              left:3%
              color :#000
              .avatar
                position: absolute
                background :url("avatar1.jpg") center
                background-size :72px
                width :72px
                height:72px
                top: -36px
                left:17px
                border-radius :50%
              .btn_box
                position: absolute
                right :20px
                bottom :80px
                width:110px
                height :35px
                cursor :pointer
                font-size:16px
                line-height :35px
                text-align :center
                border-radius :4px
                background :$color-theme
                color :#fff
                &:hover
                  background : #fff
                  border : 1px solid $color-theme
                  color :$color-theme
              .name
                font-size: 28px
                font-weight :500
                margin-bottom:25px
                font-height:28px
              .message
                font-size:12px
                margin-bottom:25px
                line-height:8px
              .address
                font-size:12px
                line-height:21px
              .data-wrapper
                margin : 20px auto 0 auto
                width :90%
                height:45px
                display :flex
                .data-item
                  flex :1
                  text-align :center
                  .item-name
                    font-size: 8px
                    line-height:8px
                    margin-bottom :8px
                    padding-left :8px
                    color :#908a8a
                  .number
                    font-size :20px
            .message-board-wrapper
              position:fixed
              top:0
              left:0
              width: 100%
              height :100%
              background:rgba(7,17,27,0.8)
              &.fade-enter-active
                transition:all 0.3s
              &.fade-enter
                opacity :0
              .message-board
                position :absolute
                z-index :51
                bottom :30%
                left:10%
                box-sizing :border-box
                padding :20px
                width :80%
                height: 300px
                border-radius :4px
                background :#fff
                transform-origin :50% 50%
                transition :all 0.4s
                &.slide-enter-active
                  animation:slide-in 0.5s
                &.slide-leave-active
                  transition :none
                  z-index:0
                 .tab-name
                    color:#7d7272
                    margin-bottom:5px
                .input-wrapper
                    margin-bottom :30px
                  input
                    autocomplete:"off"
                    outline:none
                    width :100%
                    height:30px
                    appearance:none
                    border:none
                    border-bottom :solid 1px #92c1f1
                    color :#399651
                    &::placeholder
                      color :rgb(218,224,230)
                .textarea-wrapper
                  #message-input
                    min-width :100%
                    border :none
                    autocomplete:"off"
                    outline:none
                    color :#399651
              .btn-send
                position :absolute
                width :36%
                height: 50px
                left :32%
                bottom :18%
                text-align :center
                line-height :50px
                font-size :20px
                color :#fff
                background :$color-theme
                border-radius :3px
                &.bounce-enter-active
                  animation:bounce-in 0.5s
                &.bounce-leaver-active
                  animation :bounce-in 0.5s reverse
              .envelope
                z-index:50
                transition:all 0.3s
                position: absolute
                left :50%
                margin-left:-113px
                bottom :10%
                width:226px
                height: 110px
                background-color: #30954c
                .envelope-surface
                  z-index :60
                  position: relative
                  width: 0
                  height: 0
                  border-top :solid 55px transparent
                  border-right :solid 113px #38ab58
                  border-bottom :solid 55px #40b962
                  border-left :solid 113px #4ac76c
                .top
                  position: absolute
                  width: 0
                  height: 0
                  left :0px
                  top: -110px
                  border-top :solid 55px transparent
                  border-right :solid 113px transparent
                  border-bottom :solid 55px #40b962
                  border-left :solid 113px transparent
                  transform-origin: 100% 100%
                  transition:all 0.5s

      .select-wrapper
        position :fixed
        top: 0
        left :0
        height: 100%
        width: 40%
        z-index :20
        background-color: #fff
        box-shadow :0 0 10px rgba(0,0,0,0.4)
        display :flex
        flex-direction: column
        .top
          flex : 0 0 70px
          width :100%
          height :70px
          background-color: #f9f9f9
          border-bottom :1px solid #e0e0e0
          box-shadow :0px 2px 5px rgba(0,0,0,0.2)
          .pig
            width :50px
            height: 50px
            margin : 10px auto 0 auto
            .icon-icon-pig
              font-size :50px
        .selector-wrapper
          flex: 1
          padding-top:8px
          .select-scroll
            width :100%
            height :100%
            ul
              width:100%
              .select-item
                width :100%
                height: 40px
                box-sizing :border-box
                padding: 2px 2px 2px 5px
                display :flex
                margin-bottom :5px
                &.selected
                  border-left :3px solid $color-theme
                .select-icon
                  flex: 0 0 30px
                  width :30px
                  height: 100%
                .text
                  flex :1
                  color :#908484
                  font-size :11px




  @keyframes slide-in{
    0%{
      transform :translateX(100%)
    }
    50%{
      transform :translateX(-30%)
    }
    100%{
      transform :translateX(0)
    }
  }
  @keyframes bounce-in{
    0%{
        transform :scale(0)
    }
    50%{
        transform :scale(1.5)
    }
    100%{
        transform :scale(1)
    }
  }
</style>
