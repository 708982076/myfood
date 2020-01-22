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
      recentCityList: getStorage("recentCityList") || [],
      allCityList: [],
      flag: false
    };
  },
  methods: {
    handleClick(e) {
      if (!this.flag) {
        return;
      }
      const target = e.target,
        targetData = target.dataset,
        targetCont = target.textContent.trim();

      if (targetData.event === "city") {
        let flag = this.recentCityList.some(ele => ele.name === targetCont);
        if (!flag) {
          const pinyin = targetData.pinyin;
          let firstLetter = pinyin.toUpperCase()[0];
          this.recentCityList.push(
            ...this.allCityList[firstLetter].filter(c => c.pinyin === pinyin)
          );
          setStorage("recentCityList", this.recentCityList);
        }
      }
    },
    routeParams({ pinyin, id }) {
      return {
        name: "home",
        params: {
          pinyin,
          id
        }
      };
    }
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
    let hotCity, allCity;

    if (!getStorage("city")) {
      const res = await getAllCity();
      ({ hotCity, allCity } = res.data);
      setStorage("city", res.data);
    } else {
      ({ hotCity, allCity } = getStorage("city"));
    }
    this.hotCityList = Object.freeze(hotCity);
    this.allCityList = Object.freeze(allCity);
  }
};