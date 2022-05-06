<template>
    <div class="v_doctor">
        <div class="content">
            <div class="d_left">
                <img :src="this.doctor.dImage?this.doctor.dImage:this.defaultImage" alt="">
                <div class="docName">
                    {{this.doctor.dName}}<br />
                    <span>{{this.doctor.docTitle}}</span>
                </div>
            </div>
            <div class="d_right">二维码</div>
        </div>
        <van-tabs v-model="active" color="green" title-active-color="green">
            <van-tab title="预约时段">
                <van-cell-group>
                    <van-cell title-style="color:#aaa" :title="this.date" value="更多日期" />
                </van-cell-group>
                <van-cell-group @click="book('am1')">
                    <van-cell label-class="cell_label"  title="上午" :value="this.schedule.am1==0 ? '已满诊' : this.schedule.am1" :center="true" label="09:00~10:00" />
                </van-cell-group>
                <van-cell-group @click="book('am2')">
                    <van-cell label-class="cell_label"  title="上午" :value="this.schedule.am2==0 ? '已满诊' : this.schedule.am2" :center="true" label="10:00~11:00" />
                </van-cell-group>
                <van-cell-group @click="book('pm1')">
                    <van-cell label-class="cell_label"  title="下午" :value="this.schedule.pm1==0 ? '已满诊' : this.schedule.pm1" :center="true" label="14:00~15:00" />
                </van-cell-group>
                <van-cell-group @click="book('pm2')">
                    <van-cell label-class="cell_label"  title="下午" :value="this.schedule.pm2==0 ? '已满诊' : this.schedule.pm2" :center="true" label="15:00~16:00" />
                </van-cell-group>
            </van-tab>
            <van-tab title="医师介绍">
                <p class="intro">{{doctor.dIntroduction}}</p>
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
import {getDocById} from '@/service/api/index.js'
    export default {
        data() {
            return {
                active: 0,
                doctor:{},
                date:null,
                schedule:{},
                defaultImage:'./../../picture/pic1.png'
            };
        },
        created(){
            this.getDocData(this.$route.query.dID);
            let date1 = new Date(parseInt(this.$route.query.date));
            let year = date1.getFullYear()+'-';
            let month = (date1.getMonth() + 1)<10?'0'+(date1.getMonth() + 1)+'-':(date1.getMonth() + 1)+'-';
            let day = date1.getDate()<10?'0'+date1.getDate():date1.getDate();
            this.date = year+month+day;
        },
        methods: {
            onClick(name, title) {
                console.log(title);
            },
            async getDocData(dID){
                let res = await getDocById(dID);
                this.doctor = res.doc[0];
                let ary = this.doctor.dScheduling;
                ary.forEach(s => {
                    if (parseInt(this.$route.query.date)===s.date) {
                        this.schedule = s
                    }
                });
            },
            book(time){
                if (this.schedule[time]==0) {
                    return
                }
                this.$router.push('/order?dID='+this.doctor.dID+'&date='+this.$route.query.date+'&time='+time)
            }
        }
    }
</script>

<style scoped>
    .v_doctor {
        /* width: 100%; */
        height: 4.5rem;
        padding: 0.5rem 1rem;

        /* background-color: red; */
    }

    .content {
        height: 4.5rem;
    }

    .d_left {
        height: 4.5rem;
        float: left;
    }

    .d_left img {
        float: left;
        height: 3.5rem;
        position: relative;
        top: 0.5rem;
    }

    .d_right {
        float: right;
        height: 4.5rem;
        line-height: 4.5rem;
        color: #ccc;
    }

    .docName {
        line-height: 1.5rem;
        padding-left: 1rem;
        padding-top: 0.7rem;
        font-size: 1.2rem;
        float: left;
        height: 4rem;
    }

    .docName span {
        color: rgb(160, 158, 158);
        font-size: 1rem;
    }
    .cell_label{
        color: #323233;
        font-size: 14px;
    }
    .intro{
        color: #323233;
        font-size: 0.9rem;
    }
</style>