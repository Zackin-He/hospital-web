<template>
  <div class="home">
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
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  data(){
    return{
      value:''
    }
  },
  methods:{
    test(route){
      this.$router.push(route)
    }
  }
}
</script>
<style scoped>
.home{
  font-size: 1.5rem;
}
h2{
  text-align: center;
  color: #5EB195;
}
img{
  margin: 0 auto;
}
.picBox{
  width: 8rem;
  height: 8rem;
  text-align: center;
  margin: 0 auto;
  border-radius: 50%;
}
.box1{
  color: #5EB195;
  text-align: center;
  width: 8rem;
  margin: 2rem auto;
}
.picBox img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
