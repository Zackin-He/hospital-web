<template>
  <div class="department">
    <van-search v-model="value" @input="test" placeholder="请输入科室关键字" />
    <div class="searchList">
      <ul>
        <li v-for="(item,index) in this.searchList" :key="index" @click="clickRightLi(item.specialty_id)">
          {{item.specialty_name}}
          <van-icon class="rightArrow" name="arrow" />
        </li>
      </ul>
    </div>
    <div class="wrapper-left">
      <ul class="content-left">
        <li v-for="(item,index) in this.cate_left" :key="index" :class="{selected_left:currentIndex === index}"
          @click="clickLeftLi(index)">
          {{item.department}}
        </li>
      </ul>
      <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
    </div>
    <div class="wrapper-right">
      <ul class="content-right">
        <li v-for="(item,index) in this.cate_right" :key="index" @click="clickRightLi(item.specialty_id)">
          {{item.specialty_name}}
          <van-icon class="rightArrow" name="arrow" />
        </li>
      </ul>
      <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
    </div>
    <!-- <button @click="addDoc">点击</button> -->
  </div>

</template>

<script>
  import BScroll from '@better-scroll/core'
  import MouseWheel from '@better-scroll/mouse-wheel'
  import {
    getHomeData,
    addDoctor
  } from "@/service/api/index"
  export default {
    data() {
      return {
        cate_left: [],
        value: '',
        currentIndex: 0,
        cate_right: [],
        allList: [],
        searchList: []
      }
    },
    async created() {
      let res = await getHomeData();
      this.cate_left = res.data;
      this.cate_right = this.cate_left[0].specialty
      this.$nextTick(() => {
        this.initBetterScroll()
      })
      // console.log(this.cate_left);
      // console.log(this.cate_right);
      this.cate_left.forEach(item => {
        this.allList = this.allList.concat(item.specialty)
      });
      // console.log(this.allList);
    },
    mounted() {

    },
    methods: {
      initBetterScroll() {
        BScroll.use(MouseWheel)
        let wrapper_left = document.querySelector('.wrapper-left')
        let scroll = new BScroll(wrapper_left, {
          click: true,
          scrollY: true,
          tap: true,
          mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300
          }
        })
      },
      clickLeftLi(index) {
        this.currentIndex = index;
        this.cate_right = this.cate_left[index].specialty;
        console.log(this.cate_right);
      },
      clickRightLi(specialty_id) {
        console.log(specialty_id);
        this.$router.push('/schedule?s_id=' + specialty_id)
      },
      async addDoc() {
        let res = await addDoctor();
        console.log(res);
      },
      test(key) {
        if (key === '') {
          this.searchList = []
        } else {
          let arr = []
          for (let i = 0; i < this.allList.length; i++) {
            if (this.allList[i].specialty_name.indexOf(key) >= 0) {
              arr.push(this.allList[i])
            }
          }
          this.searchList = arr
        }
      }
    }
  }
</script>

<style>
  .department {
    position: relative;
  }

  .wrapper-left {
    float: left;
    /* height: 40rem; */
    height: calc(100vh - 54px);
    width: 8rem;
    overflow: hidden;
    background: #F2F7F7;
  }

  .searchList {
    z-index: 100;
    width: 100%;
    position: absolute;
    top: 54px;
    background-color: #fff;
  }

  .searchList ul {
    padding: 0 0.8rem;
  }

  .searchList ul li {
    height: 2rem;
    border-bottom: 1px solid #ccc;
    padding-top: 0.6rem;
  }

  .content-left li {
    border-left: 0.3rem solid #F2F7F7;
    border-bottom: 1px solid #ccc;
    font-size: 0.9rem;
    color: #9A9A9A;
    line-height: 1.2rem;
    padding: 0.7rem 0.5rem 0.7rem 0.5rem;
  }

  .selected_left {
    background-color: #fff;
    border: none;
    border-left: 0.3rem solid #6AB3AB !important;
  }

  .van-search {
    background-color: #E2E8E7;
  }

  .right {
    float: left;
    /* width: 13.2rem; */
  }

  .content-right li {
    height: 2rem;
    border-bottom: 1px solid #ccc;
    padding-top: 0.6rem;
    padding-right: 1rem;
  }

  .rightArrow {
    float: right;
    color: rgb(168, 167, 167);
  }
</style>