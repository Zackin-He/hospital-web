<template>
  <div>
    <van-cell-group>
      <van-cell title="医生姓名" :value="doctor.dName" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="医生职称" :value="doctor.docTitle" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="科室" :value="doctor.dDepartment" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="挂号金额" value-class="money" value="￥20.00" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="就诊时段" center value-class="rightValue" :value="this.time" :label="this.date" />
    </van-cell-group>
    <h4 class="pmsg">患者信息填写</h4>
    <van-cell-group>
      <van-field v-model="pName" label="患者姓名" placeholder="请输入患者姓名" />
      <van-field v-model="pIDCard" label="身份证号" maxlength=18 placeholder="请输入身份证号" />
      <van-field v-model="pTel" type="number" maxlength=11 label="手机号" placeholder="请输入手机号" />
    </van-cell-group>
    <div class="btn">
      <van-button type="info" @click="submitOrder">预约并支付</van-button>
    </div>
  </div>
</template>

<script>
  import {
    getDocById,
    addOrder
  } from '@/service/api/index.js'
  export default {
    data() {
      return {
        doctor: {},
        date: null,
        time: null,
        pName: '',
        pIDCard: '',
        pTel: '',
        email:''
      }
    },
    created() {
      this.email = localStorage.getItem('email')
      this.get_doc_byID(this.$route.query.dID);
      let date1 = new Date(parseInt(this.$route.query.date));
      let year = date1.getFullYear() + '-';
      let month = (date1.getMonth() + 1) < 10 ? '0' + (date1.getMonth() + 1) + '-' : (date1.getMonth() + 1) + '-';
      let day = date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate();
      this.date = year + month + day;
    },
    methods: {
      async get_doc_byID(id) {
        let res = await getDocById(id);
        this.doctor = res.doc[0];
        console.log(this.doctor);
        let time1 = this.$route.query.time
        switch (time1) {
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
        }
      },
      async submitOrder() {
        let regID = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        let regTel = /^1[3|4|5|7|8]\d{9}$/
        if (regID.test(this.pIDCard)) {
          if (regTel.test(this.pTel)) {
            let pDocID = parseInt(this.$route.query.dID);
            let treatDate = parseInt(this.$route.query.date);
            let treatTime = this.$route.query.time;
            let res = await addOrder(this.pName, this.pIDCard, parseInt(this.pTel), pDocID, treatDate, treatTime,this.email);
            if (res.status_code == 200) {
              this.$toast.success('预约成功')
              this.$router.push('/home')
            } else {
              this.$toast.fail('预约失败，已满诊')
            }
            console.log(res);
          } else {
            this.$dialog.alert({
              message: '请输入正确的手机号',
            }).then(() => {
              // on close
            });
          }
        } else {
          this.$dialog.alert({
            message: '请输入正确的身份证号',
          }).then(() => {
            // on close
          });
        }
      }
    }
  }
</script>

<style scoped>
  .rightValue {
    color: orange;
    font-family: inherit;
    font-size: 16px;
  }

  .money {
    color: orange;
  }

  .pmsg {
    text-align: center;
    color: green;
  }

  .btn {
    margin-top: 1rem;
    text-align: center;
  }
</style>