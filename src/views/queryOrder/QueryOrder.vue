<template>
    <div>
        <h4 class="title">查询结果</h4>
        <div style="text-align:center;color:#ccc;font-size:0.8rem">(温馨提示：左滑可以取消24小时后的预约)</div>
        <van-empty v-if="flag" description="暂无该用户的预约记录" />
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
                results:[],
                flag:false
            }
        },
        created(){
            this.find_order()
        },
        methods:{
            async find_order(){
                let email = localStorage.getItem('email')
                let res = await findOrder(email);
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