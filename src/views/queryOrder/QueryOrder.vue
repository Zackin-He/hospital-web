<template>
    <div>
        <h4 class="title">挂号查询</h4>
        <van-cell-group>
            <van-field v-model="pName" label="患者姓名" placeholder="请输入患者姓名" />
            <van-field v-model="pIDCard" label="身份证号" maxlength=18 placeholder="请输入身份证号" />
        </van-cell-group>
        <div class="btn">
            <van-button type="info" @click="find_order">查询挂号记录</van-button>
        </div>
        <h4 class="title" v-show="this.results.length>0">查询结果</h4>
        <van-empty v-if="flag" description="暂无该患者的预约记录" />
        <div class="queryResults">
            <OrderDetails v-for="(item,index) in this.results" :key="index" :order="item" />
        </div>
    </div>
</template>

<script>
import OrderDetails from './OrderDetails.vue'
import {findOrder} from '@/service/api/index.js'
    export default {
        components:{OrderDetails},
        data() {
            return {
                pName: '',
                pIDCard: '',
                results:[],
                flag:false
            }
        },
        methods:{
            async find_order(){
                let res = await findOrder(this.pName,this.pIDCard);
                this.results = res.data.reverse();
                if (this.results.length==0) {
                    this.flag = true;
                }else{
                    this.flag = false;
                }
                console.log(this.results);
            }
        }
    }
</script>

<style>
    .title {
        text-align: center;
        color: green;
    }
    .btn{
  margin-top: 1rem;
  text-align: center;
}
.queryResults{
    background-color: #F1F8F8;
}
</style>