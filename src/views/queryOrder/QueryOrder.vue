<template>
    <div id="queryOrder">
        <div class="toTop" ref="toTop" @click="toTop"><van-icon name="back-top" /></div>
        <!-- <van-search v-model="value" show-action label="科室" placeholder="请输入搜索关键词" @search="onSearch">
            <template #action>
                <div @click="onSearch">搜索</div>
            </template>
        </van-search> -->
        <van-cell title="选择日期区间查询" is-link :value="date" @click="show = true" />
        <van-calendar v-model="show" :default-date='defaultArray' @opened ="openCarlendar" color="#1989fa" :min-date="minDate" confirm-text="查询" type="range" @confirm="onConfirm" />
        <h4 class="title">查询结果</h4>
        <div style="text-align:center;color:#ccc;font-size:0.8rem">(温馨提示：左滑可以取消24小时后的预约)</div>
        <van-empty v-if="flag" description="暂无该用户的预约记录" />
        <div class="queryResults">
            <OrderDetails v-for="(item,index) in this.orders" :key="index" :order="item" />
        </div>
    </div>
</template>

<script>
    import OrderDetails from './OrderDetails.vue'
    import {
        findOrder
    } from '@/service/api/index.js'
    export default {
        components: {
            OrderDetails
        },
        data() {
            return {
                results: [],
                flag: false,
                value: '',
                orders:[],
                pageNum:0,
                pageSize:2,
                show:false,
                date:'',
                minDate: new Date(2022, 0, 1),
                defaultArray:[]
            }
        },
        created() {
            let endDay = new Date(new Date().toLocaleDateString());
            let startDay = new Date(endDay.getTime()-24*60*60*1000*7);
            this.defaultArray = [startDay,endDay]
            this.find_order()
        },
        mounted(){
            window.onscroll = ()=>{
                let div = document.querySelector('#queryOrder')
                var a = document.body.scrollTop || document.documentElement.scrollTop;
                var b =document.documentElement.clientHeight    //可视区的高度
                var c =  div.offsetHeight;  //文档的总高度
                if (a>250) {
                    this.$refs.toTop.style.display = 'block'
                }else{
                    this.$refs.toTop.style.display = 'none'
                }
                if (a+b>=c-1) {
                    this.onSearch()
                }
            };
            
        },
        beforeDestroy(){
            window.onscroll = null;
        },
        methods: {
            async find_order(startTime,endTime) {
                this.results = [];
                this.orders = [];
                this.pageNum=0;
                this.pageSize=2;
                let email = localStorage.getItem('email')
                let res = await findOrder(email,startTime,endTime);
                this.results = res.data.reverse();
                if (this.results.length == 0) {
                    this.flag = true;
                } else {
                    this.flag = false;
                }
                this.orders = this.results.slice(this.pageNum,this.pageSize);
                // console.log(this.results);
            },
            async onSearch(){
                if ((this.pageNum+1)*this.pageSize<=this.results.length) {
                    console.log((this.pageNum+1)*this.pageSize);
                    this.orders = this.orders.concat(this.results.slice((++this.pageNum)*this.pageSize,(this.pageNum+1)*this.pageSize))
                }
            },
            toTop(){
                let t = document.documentElement.scrollTop || document.body.scrollTop;
                let speed = t/50
                let timer = setInterval(()=>{
                    t -= speed;
                    document.documentElement.scrollTop = document.body.scrollTop = t;
                    if (t<=0) {
                        clearInterval(timer)
                    }
                })
            },
            formatDate(date) {
                return `${date.getMonth() + 1}/${date.getDate()}`;
            },          
            onConfirm(date){
                const [start, end] = date;
                let startTime = date[0].getTime();
                let endTime = date[1].getTime();
                this.find_order(startTime,endTime)
                this.show = false;
                this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
            },
            openCarlendar(){
                let close = document.querySelector('.van-popup__close-icon--top-right');
                close.addEventListener('click',()=>{
                    this.date = '';
                    this.find_order()
                })
            }
        }
    }
</script>

<style scoped>
    .title {
        text-align: center;
        color: green;
    }

    .btn {
        margin-top: 1rem;
        text-align: center;
    }
    #queryOrder{
        position: relative;
    }
    .queryResults {
        background-color: #F1F8F8;
    }
    .toTop{
        color: #fff;
        font-size: 30px;
        text-align: center;
        line-height: 45px;
        display: none;
        border-radius: 50%;
        width: 45px;
        height: 45px;
        background-color: #5EB195;
        z-index: 100;
        position: fixed;
        top: 85vh;
        left: 80vw;
        box-shadow: rgb(0 0 0 / 12%) 0px 0px 6px;
    }
    .van-cell{
        box-shadow: 0 2px 12px rgb(100 101 102 / 12%);
    }
</style>