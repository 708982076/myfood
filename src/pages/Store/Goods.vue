<template>
  <div class="goods" id="goods">
    <div class="goods-left">
      <div class="menu-wraper">
        <div
          class="menu-wrap"
          v-for="(item, index) in storeItem.food_menu"
          :key="index"
        >
          <div class="menu-cell" @click="gotoFoodmenu(index)" :class="{'current': updateMenuIndex === index}">
            <span class="menu-name">{{item.name}}</span>
            <i class="menu-icon" :class="typeClass(item.type)" v-if="item.type > 0"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="goods-right" ref="goods-right" @scroll.passive="scroll">
      <div class="goods-wrapper">
        <div class="goods-block" v-for="item in storeItem.food_menu" :key="item.id">
          <div class="goods-title">{{item.name}}</div>
          <ul class="goods-wrap">
            <li v-for="food in item.foods" :key="food.id" class="goods-item">
              <div class="image-wrap">
                <el-image :src="food.image" lazy></el-image>
              </div>
              <div class="goods-info">
                <div class="title">{{food.name}}</div>
                <div class="desc-wrapper">
                  <span class="desc">{{food.description}}</span>
                </div>
                <div class="sell">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <span class="good-per">好评{{food.rating}}%</span>
                </div>
                <div class="price-wrap">
                  <div class="price">
                    <span class="new-price">￥{{food.price}}</span>
                    <span
                      class="old-price"
                      v-if="food.oldPrice && food.oldPrice !== food.price"
                    >￥{{food.oldPrice}}</span>
                  </div>
                  <CartControl :id="food.id"></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ShopCart :minPrice="storeItem.minPrice" :deliveryPrice="storeItem.deliveryPrice"></ShopCart>
  </div>
</template>

<script>
export {default} from './goods-script';
</script>

<style lang="scss">
@import "@/style/mixin.scss";
@import "./goods.scss";
</style>