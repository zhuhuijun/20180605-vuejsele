<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img alt="" width="64" height="64" :src='myseller.avatar'>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{myseller.name}}</span>
        </div>
        <div class="descr">
          {{myseller.description}}/{{myseller.deliveryTime}}分钟送达
        </div>
        <div v-if="myseller.supports" class="support">
          <span class="icon" :class="classMap[myseller.supports[0].type]"></span>
          <span class="text">{{myseller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="myseller.supports" class="support-count" @click="showDetail">
        <span class="count">{{myseller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span><span class="bulletin-text">{{myseller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="mybackground">
      <img :src='myseller.avatar' width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{myseller.name}}</h1>
          <div class="star-wrapper">
            <MyStar :size="48" :score="myseller.score"></MyStar>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="myseller.supports" class="supports">
            <li class="support-item" v-for="(item,index) in myseller.supports" >
              <span class="icon" :class="classMap[myseller.supports[index].type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{myseller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="closeDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import MyStar from '@/components/star/Star';

  export default {
    props: ['seller'],
    data() {
      return {
        myseller: this.seller,
        detailShow: false
      };
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    watch: {
      seller(val) {
        this.myseller = val;//新增result的watch，监听变更并同步到myResult上
      }
    },
    components: {
      MyStar
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      closeDetail() {
        this.detailShow = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl";
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    font-size: 0
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0px 8px 0
          .brand
            display: inline-block
            width: 30px
            height: 18px
            vertical-align: bottom
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
            height: 18px

        .descr
          line-height: 12px
          margin-bottom: 10px
          font-size: 12px
        .support
          font-size: 0
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 10px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height: 12px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 16px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          line-height: 24px
          margin-left: 2px
          font-size: 10px
    .bulletin-wrapper
      height: 28px
      position: relative
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align: middle
        margin: 0 4px
        font-size: 10px
        .icon-keyboard_arrow_right
          position: absolute
          right: 12px
          top: 8px
          font-size: 10px
    .mybackground
      position: absolute
      top: 0
      left: 0px
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(5px)
    .detail
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      transition :all 0.5s
      background: rgba(7, 17, 27, 0.89)
      &.fade-transition
        opacity :1
        background: rgba(7, 17, 27, 0.89)
      &.fade-enter,&.fade-leave
        opacity :0
        background: rgba(7, 17, 27, 0)

      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            text-align: center
            font-size: 16px
            font-weight: 700
          .star-wrapper
            margin-top :18px
            padding :2px 0px
            text-align :center
          .title
            display :flex
            width :80%
            margin :28px auto 24px auto
            .line
              flex :1
              position :relative
              top: -6px
              border-bottom :1px solid rgba(255,255,255,0.2)
            .text
              padding :0 12px
              font-size :14px
              font-width:700;
          .supports
            width :80%
            margin :0 auto
            .support-item
              padding :0 12px
              margin-bottom :12px
              font-size :0
              &:last-child
                margin-bottom :0
              .icon
                display :inline-block
                width :16px
                height :16px
                vertical-align :top
                margin-right :6px
                background-size :16px 16px
                background-repeat :no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                    bg-image('discount_2')
                &.guarantee
                    bg-image('guarantee_2')
                &.invoice
                    bg-image('invoice_2')
                &.special
                    bg-image('special_2')
              .text
                line-height :16px
                font-size :12px
          .bulletin
            width :80%
            margin :0 auto
            .content
              padding :12px
              line-height :24px
              font-size :12px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        clear: both
        font-size: 32px
</style>
