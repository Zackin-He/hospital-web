<template>
  <div class="orderDetals">
    <van-cell-group>
      <van-cell title="患者姓名" :value="this.order.pName" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="医生姓名" :value="this.order.pDocName" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="科室" :value="this.order.dpmt" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="挂号金额" value="￥20.00" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="挂号单号" value-class="regNumbder" :value="this.order.regNumber" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="预约时间" :value="this.order.regTime" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="就诊时段" center value-class="rightValue" :value="this.time" :label="this.date" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props:{order:Object},
  data(){
    return{
      time:'',
      date:null
    }
  },
  created(){
    switch (this.order.treatTime) {
        case 'am1':
          this.time = '09:00~10:00'
          break;
        case 'am2':
          this.time = '10:00~11:00'
          break;
        case 'pm1':
          this.time = '14:00~15:00'
          break;
        case 'pm2':
          this.time = '15:00~16:00'
          break;
        default:
          break;
      };
      let date1 = new Date(this.order.treatDate);
      let year = date1.getFullYear()+'-';
      let month = (date1.getMonth() + 1)<10?'0'+(date1.getMonth() + 1)+'-':(date1.getMonth() + 1)+'-';
      let day = date1.getDate()<10?'0'+date1.getDate():date1.getDate();
      this.date = year+month+day;
  }
}
</script>

<style>
.orderDetals{
  margin-top: 2rem;
}
.rightValue{
  color: orange;
  font-family: inherit;
  font-size: 16px;
}
.regNumbder{
  color: orange;
}
</style>