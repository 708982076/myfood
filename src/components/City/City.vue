<template>
  <div class="city-page" ref="city-page">
    <Header :go-back="false">
      <router-link :to="`/home/${pinyin}`"
        :data-pinyin="pinyin"
        data-event="city"
        slot="go-home" 
        class="go-home"
      >
        <i class="icon iconfont icon-shouye"></i>
      </router-link>
      <h2 slot="select-city" class="select-city">请选择城市</h2>
    </Header>
    <div class="cityBox" @click="handleClick">
      <div class="location-city box">
        定位城市：
        <router-link 
          :to="`/home/${currentCity.pinyin}`"         
          :data-pinyin="currentCity.pinyin"
          data-event="city"
        >
          {{ currentCity.city }}
        </router-link>
      </div>
      <div class="recent-city" v-show="recentCityList.length">
        <h4>最近访问</h4>
        <div class="box">
          <ul class="table">
            <li v-for="recentCity in recentCityList" :key="recentCity.name">
              <router-link
                :to="{name: 'home', params: {'city_name': recentCity.pinyin}}"
                :data-pinyin="recentCity.pinyin"
                data-event="city"
              >
                {{recentCity.name}}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <h4>热门城市</h4>
      <div class="hot-city">
        <div class="box">
          <ul class="table">
            <li v-for="hotCity in hotCityList" :key="hotCity.name">
              <router-link
                :to="{name: 'home', params: {'city_name': hotCity.pinyin}}"
                :data-pinyin="hotCity.pinyin"
                data-event="city"
              >
                {{hotCity.name}}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <h4>全部城市</h4>
      <div class="all-city">
        <div class="box">
          <ul class="letters">
            <li
              @click="toScroll(index)"
              v-for="(itemCity, key, index) in sortAllCityList"
              :key="key"
            >
              {{key}}
            </li>
          </ul>
          <div
            class="a-z"
            v-for="(itemCity, key, index) in sortAllCityList"
            :key="index"
            ref="blockCity"
          >
            <ul class="table">
              <h2>{{key}}</h2>
              <li v-for="city in itemCity" :key="city.id">
                <router-link
                  :to="{name: 'home', params: {'city_name': city.pinyin}}"
                  :data-pinyin="city.pinyin"
                  data-event="city"
                >
                  {{city.name}}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../Header/Header'
import { getStorage, setStorage } from 'lib/utils'
import { getHotCity, getallCity} from 'root/getData'
import { mapState, mapActions, mapMutations, mapGetters} from 'vuex'

export default {
  components: {
    Header
  },
  data() {
    return {
      hotCityList: Object.freeze([...getStorage('hotCityList')]),
      recentCityList: [...getStorage('recentCityList')],
      allCityList: Object.freeze(getStorage('allCityList')),
      scrollHeight: [],
      allHeight: 0
    }
  },
  created() {
    if (!this.hotCityList.length){
      getHotCity().then(res => {
        if (res.data.status === 1) {
          let data = res.data.data
          this.hotCityList = Object.freeze(data)
          setStorage('hotCityList', data)
        }
      })
    }
    if (!this.allCityList.E){
      getallCity().then(res => {
        if (res.data.status === 1) {
          let data = res.data.data
          this.allCityList = Object.freeze(data)
          setStorage('allCityList', data)
        }
      })
    }
    this.getCurrentCity()
  },
  computed: {
    ...mapState(['guessCity', 'currentCity']),
    sortAllCityList() {
      let sortobj = {}
      for (let i = 65; i <= 90; i++) {
        let cityCharCode = this.allCityList[String.fromCharCode(i)]
        if (cityCharCode) {
          sortobj[String.fromCharCode(i)] = cityCharCode
        }
      }
      return sortobj
    },
    pinyin() {
      return this.guessCity.pinyin || this.currentCity.pinyin
    }
  },
  methods: {
    ...mapActions(['getCurrentCity']),
    ...mapMutations(['SET_CITY']),
    handleClick(e) {
      let target = e.target,
          targetData = target.dataset,
          targetCont = target.textContent.trim()
      if (target.nodeName.toLowerCase() === 'a' && targetData.event === 'city') {
        let flag = this.recentCityList.some((ele) => ele.name === targetCont)
        if (!flag) {
          this.recentCityList.push({pinyin: targetData.pinyin, name: targetCont})
          setStorage('recentCityList', this.recentCityList)
        }
        this.SET_CITY({city: targetCont, pinyin: targetData.pinyin})
      }
    },
    toScroll(index) {
      if (!this.scrollHeight.length) {
        this.getScroll()
      }
      window.scrollTo(0, this.scrollHeight[index] - 50)
    },
    getScroll() {
      let dom = this.$refs.blockCity
      for (let i = 0; i < dom.length; i++) {
        this.scrollHeight.push(dom[i].offsetTop)
      }
    }
  }
}
</script>

<style lang="scss">
  .cityBox{
    padding: 0 0.3rem;
    .location-city, h4{
      font-size: 0.6rem;
    }
    h4{
      margin: 0.3rem 0;
    }
    .box {
      border: 1px solid #DDD8CE;
      border-radius: 3px;
    }
    .table{
      position: relative;
      width: 100%;
      font-size: 0;
      background-color: #fff;
      overflow: hidden;
      &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 25%;
        width: 25%;
        height: 100%;
        border-left: 1px solid #DDD8CE;
        border-right: 1px solid #DDD8CE;
      }
      &::after{
        content: '';
        position: absolute;
        top: 0;
        left: 75%;
        width: 5%;
        height: 100%;
        border-left: 1px solid #DDD8CE;
      }
      li, h2{
        position: relative;
        float: left;
        margin-bottom: -1px;
        width: 25%;
        height: 1.5rem;
        border-bottom: 1px solid #DDD8CE;
        font-size: 0.6rem;
        text-align: center;
        line-height: 1.5rem;
        z-index: 10;
      }
      h2{
        height: 3rem;
        line-height: 3rem;
        font-size: 1.6rem;
        color: #B7B7B7;
      }
      a{
        display: block;
        width: 100%;
        height: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .location-city{
      padding: 0.4rem;
      margin-top: 0.5rem;
      margin-bottom: 0.7rem;
      background-color: #fff;
      a{
        color: #06c1ae;
      }
    }
    .all-city{
      .letters{
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        li {
          width: 20%;
          line-height: 1.4rem;
          font-size: 0.6rem;
          color: #06c1ae;
          text-align: center;
        }
      }
      .a-z{
        border-top: 1px solid #DDD8CE;
        border-bottom: 1px solid #DDD8CE;
      }
    }
  }
</style>
