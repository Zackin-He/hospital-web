<template>
  <div class="v_doctor">
      <div class="content" @click="flag&&scheduleDetail()">
         <div class="d_left">
            <img src="./../../picture/pic1.png" alt="">
            <div class="docName">
              {{this.doc.dName}}<br/>
              <span>{{this.doc.docTitle}}</span>
            </div>
          </div>
          <div class="d_right">
              <span class="surplus" v-if="this.flag" >剩余{{this.count}}个号</span>
              <span class="noSurplus" v-if="!this.flag" >已满诊</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{doc:Object,sDate:Number},
    data(){
        return{
            count:0,
            flag:false
        }
    },
    created(){
        this.getCount();
    },
    updated(){
        this.getCount();
    },
    methods:{
        scheduleDetail(){
            this.$router.push('/docSchedule?dID='+this.doc.dID+'&date='+this.sDate);
        },
        getCount(){
            this.doc.dScheduling.forEach(sche => {
            if (sche.date===this.sDate) {
                this.count = sche.am1+sche.am2+sche.pm1+sche.pm2;
                if (this.count>0) {
                    this.flag = true;

                }else{
                    this.flag = false;

                }
            }
            });
        }
    }
}
</script>

<style scoped>
.v_doctor{
    /* width: 100%; */
    height: 4.5rem;
    padding: 0.5rem 1rem;
    
    /* background-color: red; */
}
.content{
    height: 4.5rem;
 border-bottom: 1px solid #ccc;
}
.d_left{
    height: 4.5rem;
    float: left;
}
.d_left img{
    float: left;
    height: 3.5rem;
    position: relative;
    top: 0.5rem;
}
.d_right{
    float: right;
    height: 4.5rem;
    line-height: 4.5rem;
}
.d_right .surplus{
    color: #fff;
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem;
    background-color: #F47F16;
    border-radius: 0.2rem;
}
.d_right .noSurplus{
    font-size: 1rem;
    color: #ccc;
}
.docName{
    line-height: 1.5rem;
    padding-left: 1rem;
    padding-top: 0.7rem;
    font-size: 1.2rem;
    float: left;
    height: 4rem;
}

.docName span{
    color: rgb(160, 158, 158);
    font-size: 1rem;
}
</style>