<template>
    <div>
        <div class="center">
            <div><img src="@/assets/login.jpeg" width="100%" alt=""></div>
            <!-- 背景图片 -->
            <div class="background">
                <img src="@/assets/hospital3.webp" width="100%" height="100%" alt="" />
            </div>
            <!-- 前景 -->
            <div class="front">
                <div class="card">
                    <!-- 标题 -->
                    <div slot="header" class="title">
                        <span>
                            医院预约系统
                        </span>
                    </div>
                    <!-- 表单 -->
                    <div>
                        <van-form>
                            <van-field v-model="email" center clearable label="邮箱" placeholder="请输入邮箱"
                                :rules="[{ required: true }]">
                                <template #button>
                                    <van-button size="small" :disabled="false" @click="get_code" type="primary">获取验证码
                                    </van-button>
                                </template>
                            </van-field>
                            <van-field v-model="code" type="password" name="验证码" label="验证码" placeholder="请输入验证码" />

                            <div style="margin: 16px;">
                                <van-button round block type="info" @click="login">登录</van-button>
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
            }
        },
        methods: {
            async get_code() {
                if (this.email.trim() === '') {
                    this.$toast({
                        message: '邮箱不能为空',
                        position: 'top',
                    });
                } else {
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
        text-align: center;
        font-size: 1.3rem;
        color: rgba(50, 50, 50, 0.8);
    }

    .card {
        width: 320px;
        margin-top: 70%;
        margin-left: calc(calc(100vw - 400px) / 2);
        /* 动态剧中 */
        background-color: rgba(200, 200, 200, 0.5);
        /* 半透明 */
        border-color: rgba(200, 200, 200, 0.5);
        /* 半透明 */
        border-radius: 10px;
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
    }
</style>