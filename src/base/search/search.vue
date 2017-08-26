<template>
<div class="search">
  <span class="icon_wrapper"><i class="icon-music_search"></i></span><span class="input_wrapper"><input v-on:blur="onBlur" v-on:focus="onFocus" placeholder="搜索" v-model="message" v-on:keyup.enter="keyEnter" type="search"></span>
</div>
</template>

<script type="text/ecmascript-6">
//  import {prefixStyle} from '../../common/js/dom'
    export default {
      data () {
        return {
          message: ''
        }
      },
      methods: {
        keyEnter () {
        },
        onFocus (e) {
          e.target.style.width = '200px'
        },
        onBlur (e) {
          e.target.style.width = '100px'
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon.css"
  .search
    width :100%
    height: 30px
    .icon_wrapper
      color: #c9c9cd
      display :inline-block
      vertical-align :top
      width :30px
      height: 100%
      .icon-music_search
        font-size :20px
    .input_wrapper
      display :inline-block
      vertical-align :top
      width : 80px
      height: 100%
      input
        transition :all 0.5s
        height :20px
        width:100px
        border-radius:20px
        border :1px solid #c9c9cd
        outline :none
        appearance:none
        padding-left:1em
        &::-webkit-search-cancel-button
          display :none
</style>
