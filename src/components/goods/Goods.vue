<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuwrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item">
        <span class="text">
          <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
        </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref ="foodwrapper">
      <ul>
        <li v-for="(one,index) in goods" class="foods-list">
          <h1 class="title">{{one.name}}</h1>
          <ul>
            <li v-for="two in one.foods" class="food-item border-1px">
              <div class="icon">
                <img  width="57" height="57" :src="two.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{two.name}}</h2>
                <p class="desc">{{two.description}}</p>
                <div class="extra">
                  <span class="count">月售{{two.sellCount}}份</span><span class="rating">好评率{{two.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{two.price}}</span><span class="old" v-show="two.oldPrice">￥{{two.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    props: ['seller'],
    data() {
      return {
        goods: []
      };
    },
    created() {
      this.$http.get('http://localhost:4000/goods').then((res) => {
        this.goods = res.body;
        this.$nextTick(()=>{
          this._initScroll();
        });
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {},
    methods: {
      _initScroll(){
        this.menuScroll = new BScroll(this.$refs.menuwrapper,{});
        this.foodScroll = new BScroll(this.$refs.foodwrapper,{});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl";
  .goods
    display: flex
    overflow: hidden
    position: absolute
    width: 100%
    top: 174px
    bottom: 46px
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        .text
          display: table-cell
          vertical-align: middle
          font-size: 12px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .foods-wrapper
      flex: 1
      .foods-list
        .title
          padding-left :14px
          height :26px
          line-height :26px
          border-left:2px solid #d9dde1
          font-size :12px
          color:rgb(147,153,59)
          background :#f3f5f7
        .food-item
          display :flex
          margin :18px
          padding-bottom :18px
          border-1px(rgba(7,17,27,0.1))
          &.last-child
            border-none()
            margin-bottom :0
          .icon
            flex :0 0 57px
            margin-right :10px
          .content
            flex :1
            .name
              margin :2px 0px 8px 0px
              height :14px
              line-height :14px
              font-size :14px
              color:rgb(7,17,27)
            .desc,.extra
              line-height :10px
              font-size :10px
              color :rgb(147,153,159)
            .desc
              margin-bottom :8px
              line-height :18px
            .extra
              .count
                margin-right :12px
            .price
              font-weight :700
              line-height :24px
              .now
                color :rgb(240,20,20)
                margin-right :8px
                font-size :14px
              .old
                text-decoration :line-through
                font-size :10px
                color:rgb(7,17,27)


</style>
