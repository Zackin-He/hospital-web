<template>
  <div class="schedule">
    <van-calendar
    :max-date= this.maxDate
    :show-title="false"
    :show-subtitle="false"
    :poppable="false"
    :show-confirm="false"
    @confirm="onConfirm"
    color="#2faf84"
    :show-mark="false"
    :style="{ height: '500px' }"
    />
    <div class="doc">
        <VisitingDoctor v-for="(item,index) in this.doctors" :key="index" :sDate="selectedDate" :doc="item" />
    </div>
  </div>
</template>

<script>
import VisitingDoctor from './VisitingDoctor'
import {getDocByDay} from '@/service/api/index.js'
export default {
    components:{VisitingDoctor},
    data(){
        return{
            maxDate:null,
            day:null,
            date:null,
            selectedDate:new Date(new Date().setHours(0,0,0,0)).getTime(),
            doctors:[]
        }
    },
    created(){
        let curDate = new Date()
        this.date = curDate.getDate();
        this.day = curDate.getDay();
        this.maxDate = new Date(curDate.getTime()+24*60*60*1000*7);
        // this.selectedDate = new Date(new Date().setHours(0,0,0,0)).getTime(),
        this.get_doc_by_day(this.$route.query.s_id,this.selectedDate)
    },
    mounted(){
        let calendar = document.querySelectorAll('.van-calendar__days')[0];
        // calendar.innerHTML = '';
        console.log(calendar.children);
        // let a = calendar.querySelectorAll('div');
    },
    methods:{
        onConfirm(date) {
            this.selectedDate = date.getTime();
            this.get_doc_by_day(this.$route.query.s_id,this.selectedDate)
            console.log(this.selectedDate);
        },
        async get_doc_by_day(s_id,date){
            let res = await getDocByDay(s_id,date);
            this.doctors = res.doc;
            console.log(this.doctors);
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
    top: -128px;
}
</style>