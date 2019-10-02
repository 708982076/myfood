<template>
  <div ref="cityPage">
    <div class="city-page">
      <Header :go-back="false">
        <template #mid>
          <h2 slot="select-city" class="select-city">请选择城市</h2>
        </template>
        <template #right>
          <router-link to="/">
            <i class="el-icon-platform-eleme icon-midsize icon-fff"></i>
          </router-link>
        </template>
      </Header>
      <div class="cityBox" @click="handleClick">
        <div class="location-city">
          定位城市：
          <router-link
            class="city-li-link--letter"
            :to="routeParams(currentCity)"
            :data-pinyin="currentCity.pinyin"
            data-event="city"
          >{{ flag ? currentCity.name : '定位中...'}}</router-link>
        </div>
        <div class="recent-city" v-show="recentCityList.length > 0">
          <h4>最近访问</h4>
          <section class="city-wrapper">
            <el-row
              class="city-li"
              v-for="(recentCity, index) in cityList(recentCityList, 4)"
              :key="index"
            >
              <el-col class="city-li-item" :span="6" v-for="city in recentCity" :key="city.id">
                <router-link
                  :to="routeParams(city)"
                  :data-pinyin="city.pinyin"
                  data-event="city"
                  class="city-li-link"
                >{{city.name}}</router-link>
              </el-col>
            </el-row>
          </section>
        </div>
        <h4>热门城市</h4>
        <div class="hot-city city-wrapper">
          <el-row class="city-li" v-for="(hotCity, index) in cityList(hotCityList, 4)" :key="index">
            <el-col class="city-li-item" :span="6" v-for="city in hotCity" :key="city.name">
              <router-link
                :to="routeParams(city)"
                :data-pinyin="city.pinyin"
                data-event="city"
                class="city-li-link"
              >{{city.name}}</router-link>
            </el-col>
          </el-row>
        </div>
        <h4>全部城市</h4>
        <div class="all-city city-wrapper">
          <el-row class="letters">
            <el-col
              class="city-li-item"
              :span="4"
              v-for="(itemCity, key) in sortAllCityList"
              :key="key"
            >
              <a :href="`#${key}`" class="city-li-link--letter">{{key}}</a>
            </el-col>
          </el-row>
          <div class="box">
            <div
              class="a-z"
              v-for="(itemCity, key, index) in sortAllCityList"
              :key="index"
              ref="blockCity"
              :id="key"
            >
              <ul class="table">
                <el-row
                  class="city-li"
                  v-for="(itemCity, index) in cityList(itemCity, 4)"
                  :key="index"
                >
                  <el-col class="city-li-item" :span="6" v-for="city in itemCity" :key="city.id">
                    <router-link
                      :to="routeParams(city)"
                      :data-pinyin="city.pinyin"
                      data-event="city"
                      class="city-li-link"
                    >{{city.name}}</router-link>
                  </el-col>
                </el-row>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <Loading></Loading> -->
  </div>
</template>

<script>
export { default } from "./City_script";
</script>

<style lang="scss">
@import "./oldCity.scss";
@import "./City.scss";
</style>
