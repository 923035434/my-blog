<template>
  <transition name="leftSlide">
    <div class="singer">
      <div class="topBar">
        <div class="back"><i class="icon-home"></i></div>
        <div class="title"><i>Singer</i></div>
        <div class="share"><i></i></div>
      </div>
      <div class="search_bar">
        <search></search>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import search from '../../base/search/search.vue'
  export default {
    methods: {
    },
    components: {
      search
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
      transition: all 0.5s
    &.leftSlide-enter,.leftSlide-leave-to
      transform:translateX(100%)
    .topBar
      width :100%
      height: 40px
      display :flex
      margin-bottom :40px
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
</style>
