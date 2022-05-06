<template>
    <div>
        <div class="center">
            <!-- <div><img src="@/assets/login.jpeg" width="100%" alt=""></div> -->
            <!-- 背景图片 -->
            <div class="background">
                <img src="@/assets/login1.jpg" width="100%" height="99%" alt="" />
            </div>
            <!-- 前景 -->
            <div class="front">
                <div class="card">
                    <!-- 标题 -->
                    <div slot="header" class="title">
                        <span style="color:#fff">
                            医院挂号系统
                        </span>
                    </div>
                    <!-- 表单 -->
                    <div>
                        <van-form style="color:#fff">
                            <van-field v-model="email" center color="#fff" clearable label="邮箱" placeholder="请输入邮箱"
                                :rules="[{ required: true }]">
                                <template #button>
                                    <van-button size="small" :disabled="disabled" style="background-color:transparent" @click="get_code" type="primary">{{time}}
                                    </van-button>
                                </template>
                            </van-field>
                            <van-field v-model="code" label-class="leftText" type="password" name="验证码" label="验证码" placeholder="请输入验证码" />

                            <div style="margin: 16px;">
                                <van-button round block style="background-color:transparent" type="info" @click="login">登录</van-button>
                            </div>
                        </van-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getCode,
        loginByEmail
    } from '@/service/api/index.js'
    export default {
        data() {
            return {
                email: '',
                code: '',
                time:'获取验证码',
                disabled:false
            }
        },
        methods: {
            async get_code() {
                let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!reg.test(this.email.trim())) {
                    this.$toast({
                        message: '请输入正确的邮箱！',
                        position: 'top',
                    });
                } else {
                    this.disabled = true;
                    let time1 = 60;
                    let timer = setInterval(()=>{
                        if (time1>0) {
                            time1--;
                            this.time = '重新获取'+time1
                        }else{
                            this.disabled = false
                            this.time = '获取验证码'
                            clearInterval(timer)
                        }
                        
                    },1000)
                    let res = await getCode(this.email);
                    console.log(res);
                }
            },
            async login() {
                let res = await loginByEmail(this.email, this.code);
                if (res.status === 200) {
                    localStorage.setItem('email', res.email);
                    this.$router.push('/home')
                }
                console.log(res);
            },
        }
    }
</script>

<style scoped>
    .background {
        width: 100%;
        height: 100%;
        /**宽高100%是为了图片铺满屏幕 */
        z-index: -1;
        position: absolute;
    }

    .front {
        z-index: 1;
        position: absolute;
    }

    .title {
        font-weight: bold;
        line-height: 60px;
        text-align: center;
        font-size: 1.3rem;
        color: rgba(50, 50, 50, 0.8);
    }

    .card {
        width: 330px;
        height: 245px;
        margin-top: 30%;
        /* margin-left: calc(calc(100vw - 330px) / 2); */
        /* 动态剧中 */
        background-color: rgba(0, 0, 0, 0.3);
        /* 半透明 */
        border-color: rgba(200, 200, 200, 0.5);
        /* 半透明 */
        border-radius: 10px;
        box-shadow: 0 3px 16px -5px #070707;
    }

    .van-cell {
        background-color: rgba(200, 200, 200, 0) !important;
        /* 改变了组件的css为半透明 */
        color: white;
    }

    .center {
        /* 元素居中 */
        display: flex;
        justify-content: center;
    }

   ::v-deep .van-field__label {
        width: 2.5rem !important;
        color: #ccc;
    }
    .leftText{
        color: #fff;
    }
    ::v-deep .van-field__control {
        color: #fff;
    }
</style>