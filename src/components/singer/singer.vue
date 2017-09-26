<template>
  <div class="wrapper">
    <transition name="leftSlide">
      <div  class="singer">
        <div class="topBar">
          <div @click="backHome" class="back"><i class="icon-home"></i></div>
          <div class="title"><i>歌手</i></div>
          <div class="share"><i></i></div>
        </div>

        <div class="singerList_wrapper">
          <scroll :scrollX="true" class="scroll_wrapper">
            <ul ref="singerListDom" class="singerList">
              <li @click="selectSinger(index)" class="singerItem" v-for="(singer,index) in singerList">
                <div v-bind:style="{ height: awatarWidth+'px', width: awatarWidth+'px'}" class="avatar">
                  <img :class="{'selected': isSelected(index)}" :src="singer.img" >
                </div>
                <div v-show="isSelected(index)" class="Name">{{singer.name}}</div>
              </li>
            </ul>
          </scroll>
        </div>
        <div ref="contentBoxDom" class="content_wrapper">
          <div class="content">
            <div class="title">{{selectSingerName}}</div>
            <!--<div class="text">这家伙很懒什么也没说。<span style="opacity: 0">（哦，不，其实是我很懒，懒得去抓数据，就这样,拜。）</span></div>-->
            <div @click="linkClick" class="link">
              <span class="dec">点击查看歌曲列表</span><span class="icon"><i class="icon-back"></i></span>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import search from '../../base/search/search.vue'
  import {getSinger} from '../../api/singer'
  import scroll from '../../base/scroll/scroll.vue'
  import {mapMutations} from 'vuex'
  import {createSingerListForData} from '../../common/js/singer'
  // import {addClass, removeClass} from '../../common/js/dom'
  export default {
    data () {
      return {
        singerList: [],
        awatarWidth: 50,
        selectIndex: 0,
        selectSingerName: ''
      }
    },
    computed: {
    },
    mounted () {
      getSinger().then((res) => {
        let result = JSON.parse(res)
        if (result.code !== 0) {
          console.log('getSingerList错误')
          return
        }
        this.singerList = createSingerListForData(result.data)
        this.selectSingerName = this.singerList[0].name
      })
    },
    methods: {
      selectSinger (index) {
        this.selectIndex = index
        let contentBoxDom = this.$refs.contentBoxDom
        contentBoxDom.style.backgroundImage = 'url(' + this.singerList[index].img + ')'
      },
      isSelected (index) {
        return index === this.selectIndex
      },
      singerTitle () {
        return this.singerList[this.selectIndex].name
      },
      linkClick () {
        this.setSinger(this.singerList[this.selectIndex])
        this.$router.push({
          path: '/musicBox/' + this.singerList[this.selectIndex].singerId + ''
        })
      },
      backHome () {
        this.$router.push('/home')
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components: {
      search,
      scroll
    },
    watch: {
      singerList () {
        let singerListDom = this.$refs.singerListDom
        let contentBoxDom = this.$refs.contentBoxDom
        let len = this.singerList.length
        let clientWidth = document.documentElement.clientWidth
        let width = clientWidth / 4
        this.awatarWidth = width
        singerListDom.style.width = width * len + 'px'
        contentBoxDom.style.backgroundImage = 'url(' + this.singerList[0].img + ')'
      },
      selectIndex () {
        this.selectSingerName = this.singerList[this.selectIndex].name
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon.css"
  .singer
    position :fixed
    width :100%
    height:100%
    top: 0
    left: 0
    &.leftSlide-enter-active,.leftSlide-leave-active
      transition: all 0.3s
    &.leftSlide-enter,.leftSlide-leave-to
      transform: translate3d(100%,0,0)
    .topBar
      width :100%
      height: 40px
      display :flex
      margin-bottom :20px
      .back,.share
        flex: 0 0 40px
        padding-left:12px
        padding-top:12px
        font-size:24px
        color :#8a8b93
      .title
        flex :1
        text-align :center
        line-height :40px
        color :#40424e
        font-size :24px
    .search_bar
      padding-left :12px
    .singerList_wrapper
      padding :20px 0 20px 0
      height:98px
      .singerList
        height:200px
        position :relative
        overflow: hidden;
        white-space: nowrap;
        .singerItem
          float :left
          .avatar
            box-sizing :border-box
            width :100%
            height :100%
            padding :20px
            img
              width :100%
              height :100%
              border-radius :50%
              opacity :0.5
              &.selected
                opacity :1
          .Name
            color :#58585d
            font-size :12px
            padding:0 20px
            text-align :center
    .content_wrapper
      position :relative
      width: 100%
      height:420px
      background-size :auto 100%
      background-origin:content-box
      background-repeat :no-repeat
      background-position: center center
      .content
        width: 80%
        height:89px
        background-color: #fff
        position :absolute
        left :10%
        bottom :15%
        box-sizing :border-box
        padding :20px
        .title
          color :#58585d
          font-size :16px
          font-weight :600
          letter-spacing :3px
        .text
          color :#58585d
          font-size :14px
          padding-top :10px
          text-indent:1em
        .link
          position :absolute
          display :flex
          left :0px
          bottom :0px
          width: 100%
          font-size :12px
          box-sizing :border-box
          padding-left: 20px
          padding-bottom: 13px
          padding-top :13px
          color : #58585d
          background-color: #dce0e2
          cursor:pointer
          .dec
            display :block
            font-weight :600
            flex :1
          .icon
            display :block
            flex :0 0 24px
            padding-left :12px
            transform : rotateY(180deg)
</style>
