<template>
  <div class="city-wrapper" ref="cityPage">
    <div class="city-page">
      <Header :go-back="false">
        <h2 slot="select-city" class="select-city">请选择城市</h2>
      </Header>
      <div class="cityBox" @click="handleClick">
        <div class="location-city box">
          定位城市：
          <router-link 
            :to="routeParams(currentCity)"         
            :data-pinyin="currentCity.pinyin"
            data-event="city"
          >
            {{ flag ? currentCity.name : '定位中...'}}
          </router-link>
        </div>
        <div class="recent-city" v-show="recentCityList.length > 0">
          <h4>最近访问</h4>
          <div class="box">
            <ul class="table">
              <li v-for="recentCity in recentCityList" :key="recentCity.id">
                <router-link
                  :to="routeParams(recentCity)"
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
                  :to="routeParams(hotCity)"
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
                v-for="(itemCity, key, index) in sortAllCityList"
                :key="key"
                @click="scrollTo(index)"
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
                <h2 :id="key">{{key}}</h2>
                <li v-for="city in itemCity" :key="city.id">
                  <router-link
                    :to="routeParams(city)"
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
    <div class="unplug" v-if="buttontop" @click="scrollTop">
      顶部
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header'
import { getStorage, setStorage } from 'lib/utils'
import { getHotCity, getAllCity, getLocation} from 'root/getData'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Header
  },
  data() {
    return {
      hotCityList: [],
      recentCityList: getStorage('recentCityList') || [],
      allCityList: [],
      flag: false,
      doms: [],
      allwrapH: [],
      buttontop: false
    }
  },
  methods: {
    ...mapActions(['getPositionAction']),
    scrollTop() {
      this.buttontop =false;
      window.scrollTo(0, 0);
    },
    scrollTo(i) {
      this.buttontop =true;
      window.scrollTo(0, this.allwrapH[i]);
    },
    handleClick(e) {
      if (!this.flag) {
        return;
      }
      const target = e.target,
            targetData = target.dataset,
            targetCont = target.textContent.trim();

      if (targetData.event === 'city') {
        let flag = this.recentCityList.some((ele) => ele.name === targetCont)
        if (!flag) {
          const pinyin = targetData.pinyin;
          let firstLetter = pinyin.toUpperCase()[0];
          this.recentCityList.push(
            ...this.allCityList[ firstLetter ].filter(
              (c) => c.pinyin === pinyin
            )
          );
          setStorage('recentCityList', this.recentCityList)
        }
      }
    },
    routeParams({ pinyin, id }) {
      return {
        name: 'home',
        params: {
          pinyin,
          id
        }
      }
    }
  },
  computed: {
    ...mapState(['currentCity']),
    sortAllCityList() {
      let sortobj = {}
      for (let i = 65; i <= 90; i++) {
        let cityCharCode = this.allCityList[String.fromCharCode(i)]
        if (cityCharCode) {
          sortobj[String.fromCharCode(i)] = cityCharCode
        }
      }
      return sortobj
    }
  },
  async created() {
    this.getPositionAction().then(() => this.flag = true);
    let hotCity, allCity;

    if ( !getStorage('city') ) {
      const res = await getAllCity();
      if (res.code === 0) {
        ( { hotCity, allCity } = res.data );
        setStorage('city', res.data);
      }
    }else {
      ( { hotCity, allCity } = getStorage('city') );
    }
    this.hotCityList = Object.freeze(hotCity);
    this.allCityList = Object.freeze(allCity);

    this.$nextTick(() => {
      const doms = this.$refs.blockCity;
      for (let i = 0; i < doms.length; i++){
        const height = doms[i].offsetTop;
        this.allwrapH.push(height);
      }
    })
  }
}
</script>

<style lang="scss">
  .city-wrapper {
    .unplug {
      position: fixed;
      bottom: 50px;
      right: 20px;
      width: 50px;
      height: 50px;
      z-index: 10;
      background: #06c1ae;
      border-radius: 50%;
      line-height: 50px;
      text-align: center;
      color: #fff;
    }
  }
  .cityBox{
    position: relative;
    top: 2.4rem;
    left: 0;
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
          text-align: center;
          color: #06c1ae;
        }
      }
      .a-z{
        border-top: 1px solid #DDD8CE;
        border-bottom: 1px solid #DDD8CE;
      }
    }
  }
</style>
