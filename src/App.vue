<template>
  <div id="app">
    <!--<router-view/>-->
    <div class="header">
      <Header :seller="seller"></Header>
    </div>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link class="astyle"  :to="{name:'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link class="astyle" :to="{name:'ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link class="astyle" :to="{name:'seller'}">商家</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import Header from '@/components/header/Header';

  export default {
    name: 'App',
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$router.push('/goods');
      this.$http.get('http://localhost:4000/seller').then((res) => {
        this.seller = res.body ;
        console.info(this.seller);
      })
    },
    components: {
      Header
    }
  }
</script>

<style scoped="" lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-1px(rgba(7, 17, 27, 0.1));
    .tab-item
      flex: 1;
      text-align: center;
      .astyle
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);
    .tab-item .MyActive {
      color: rgb(240, 20, 20);
    }
</style>
