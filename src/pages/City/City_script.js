import Header from "@/components/Header/Header";
import { getStorage, setStorage } from "lib/utils";
import { getAllCity } from "root/getData";
import { mapState } from "vuex";

export default {
  components: {
    Header
  },
  data() {
    return {
      hotCityList: [],
      recentCityList: [],
      allCityList: []
    };
  },
  computed: {
    ...mapState(["currentCity"]),
    sortAllCityList() {
      let sortobj = {};
      for (let i = 65; i <= 90; i++) {
        let cityCharCode = this.allCityList[String.fromCharCode(i)];
        if (cityCharCode) {
          sortobj[String.fromCharCode(i)] = cityCharCode;
        }
      }
      return sortobj;
    },
    cityList() {
      return function (arr, n) {
        let result = [];
        let j = 0;
        for (let i = 0; i < Math.ceil(arr.length / n); i++) {
          result.push(arr.slice(j, j + n));
          j = j + n;
        }
        return result;
      }
    }
  },
  async created() {
    let data = getStorage("city");
    if (!data) {
      data = await getAllCity();
      data.recentCity = [];
      setStorage("city", data);
    }
    
    this.hotCityList = Object.freeze(data.hotCity);
    this.allCityList = Object.freeze(data.allCity);
    this.recentCityList = Object.freeze(data.recentCity);
  }
};