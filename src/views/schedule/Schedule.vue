<template>
  <div class="schedule">
    <van-calendar
    :min-date = this.minDate
    :max-date= this.maxDate
    :show-title="false"
    :show-subtitle="true"
    :poppable="false"
    :show-confirm="false"
    :default-date="defaultDate"	
    @confirm="onConfirm"
    color="#2faf84"
    :show-mark="false"
    :style="{ height: '210px' }"
    />
    <!-- <div style="text-align:center">{{month}} 月</div>
    <VueCalendarWeek :today=null @click="onConfirm" v-model="today" /> -->
    <!-- <van-calendar
  :poppable="false"
  :show-confirm="false"
  :style="{ height: '600px' }"
/> -->
    <div class="doc">
        <VisitingDoctor v-for="(item,index) in this.doctors" :key="index" :sDate="selectedDate" :doc="item" />
        <van-empty v-if="this.doctors.length<=0" description="暂无医生出诊" />
    </div>
  </div>
</template>

<script>
import VueCalendarWeek from "vue-calendar-week"
import VisitingDoctor from './VisitingDoctor'
import {getDocByDay} from '@/service/api/index.js'
export default {
    components:{VisitingDoctor,VueCalendarWeek },
    data(){
        return{
            maxDate:null,
            minDate:null,
            day:null,
            date:null,
            selectedDate:new Date(new Date().setHours(0,0,0,0)).getTime()+24*60*60*1000,
            doctors:[],
            today:new Date(new Date().getTime()+24*60*60*1000),
            month:null,
            defaultDate:new Date()
        }
    },
    created(){
        let curDate = new Date()
        this.month = curDate.getMonth()+1;
        this.date = curDate.getDate();
        this.day = curDate.getDay();
        this.minDate = new Date(curDate.getTime()+24*60*60*1000);
        this.maxDate = new Date(curDate.getTime()+24*60*60*1000*7);
        this.defaultDate = new Date(curDate.getTime()+24*60*60*1000);
        // this.selectedDate = new Date(new Date().setHours(0,0,0,0)).getTime(),
        this.get_doc_by_day(this.$route.query.s_id,this.selectedDate)
    },
    mounted(){
        console.log(this.selectedDate);
        // this.$nextTick(()=>{
        //     let div = document.querySelector('.calendars-slider-week');
        //     let active = document.querySelector('.active');
        //     let ps= active.previousSibling;
        //     ps.style.color = '#ccc'
        //     for (let i = 0; i < 7; i++) {
        //         if (ps.previousSibling) {
        //             ps= ps.previousSibling;
        //             ps.style.color = '#ccc'
        //         }
        //     }
        //     console.log(active);
        //     // div.style.color = '#ccc'
        // })
    },
    methods:{
        onConfirm(date) {
            let new_date = new Date(date.setHours(0,0,0,0));
            this.month = new_date.getMonth()+1
            this.selectedDate = new_date.getTime();
            this.get_doc_by_day(this.$route.query.s_id,this.selectedDate)
            // console.log(this.selectedDate);
        },
        async get_doc_by_day(s_id,date){
            let res = await getDocByDay(s_id,date);
            this.doctors = res.doc;
            console.log(this.doctors);
            // console.log(this.doctors);
        },
        
    }

}
</script>

<style>
.schedule{
    position: relative;
}
.doc{
    position: absolute;
    top: 210px;
    width: 100%;
    height: 20rem;
    background-color: #fff;
}
.van-calendar__selected-day{
    border-radius: 50%;
}
 ::v-deep .van-calendar__month-title{
    background-color: #fff;
    z-index: 1000;
}
.van-calendar__days{
    /* top: -250px; */
    height: 130px;
    overflow: hidden;
}
.van-calendar__month-title{
top: 350px;
}
</style>