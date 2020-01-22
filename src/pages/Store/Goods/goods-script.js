import ShopCart from "@/components/ShopCart/ShopCart";
import CartControl from "@/components/CartControl/CartControl";
export default {
  components: {
    ShopCart,
    CartControl
  },
  props: {
    storeItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      goodsHeight: [],
      scrollY: 0
    };
  },
  mounted() {
    this.computeGoodsHeight();
  },
  computed: {
    typeClass() {
      const icons = ["decrease_3", "discount_3", "special_3"];
      return type => ({
        [icons[type - 1]]: true
      });
    },
    gotoFoodmenu() {
      return (i) => {
        const goodsDom = this.$refs['goods-right'];
        goodsDom.scrollTo(0, this.goodsHeight[i]);
      }
    },
    updateMenuIndex() {
      let heights = this.goodsHeight;
      let height1 = 0;
      let height2 = 0;
      let scrollY = this.scrollY;
      for (let i = 0, len = heights.length; i < len; i++) {
        height1 = heights[i];
        height2 = heights[i + 1];
        if (height2 && height1 <= scrollY && height2 > scrollY) {
          return i;
        }
      }
      return 0;
    }
  },
  watch: {
    storeItem() {
      this.$nextTick(() => {
        this.computeGoodsHeight();
      })
    }
  },
  methods: {
    computeGoodsHeight() {
      const doms = this.$refs['goods-right'].querySelectorAll('.goods-block');
      const heights = [];
      let h = 0;
      for (const dom of doms) {
        heights.push(h);
        h += dom.offsetHeight;
      }
      heights.push(h);
      this.goodsHeight = heights;
    },
    scroll(e) {
      this.scrollY = e.target.scrollTop;
    }
  }
};