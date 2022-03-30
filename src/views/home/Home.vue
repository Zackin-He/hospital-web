<template>
  <div class="home">
    <van-popup v-model="show" closeable position="bottom" :style="{ height: '25%' }">
      <div style="margin-top:2rem;padding:1rem"><span>账号：{{email}}</span>
      <van-button style="width:100%" type="info" @click="logout">退出登录</van-button></div>
    </van-popup>
    <div class="circle" @click="show=!show">
      <van-icon name="user-circle-o" size="2.5rem" color="#5EB195" />
    </div>
    <h2>广东省中医院</h2>
    <div class="box1" @click="test('/departments')">
      <div class="picBox">
        <img src="@/picture/find.png" alt="">
      </div>
      <span>按需挂号</span>
    </div>
    <div class="box1" @click="test('/queryOrder')">
      <div class="picBox">
        <img src="@/picture/department.png" alt="">
      </div>
      <span>挂号查询</span>
    </div>
    <!-- <button @click="logout">退出登录</button> -->
  </div>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: 'Home',
    data() {
      return {
        value: '',
        show: false,
        email:''
      }
    },
    mounted(){
      this.email = localStorage.getItem('email')
    },  
    methods: {
      test(route) {
        this.$router.push(route)
      },
      logout() {
        localStorage.setItem('email', '');
        this.$router.push('/login')
      }
    }
  }
</script>
<style scoped>
  .home {
    font-size: 1.5rem;
  }

  h2 {
    text-align: center;
    color: #5EB195;
  }

  img {
    margin: 0 auto;
  }

  .picBox {
    width: 8rem;
    height: 8rem;
    text-align: center;
    margin: 0 auto;
    border-radius: 50%;
  }

  .box1 {
    color: #5EB195;
    text-align: center;
    width: 8rem;
    margin: 2rem auto;
  }

  .picBox img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .circle {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: 0;
    right: 0;
    /* background-color: red; */
    border-radius: 50%;
  }
</style>