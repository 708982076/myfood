import Star from "@/components/Star/Star";
import { getStoreComment } from "root/getData";
import { debounce } from 'lib/utils';
import CommentLabel from "@/components/CommentLabel/CommentLabel";
import CommentItem from "@/components/CommentItem/CommentItem";
export default {
  components: {
    Star,
    CommentLabel,
    CommentItem,
  },
  props: {
    storeItem: {
      type: Object,
      required: true
    }
  },
  async created() {
    const { id } = this.$route.query;
    const { data, code } = await getStoreComment(id);
    const { labels, comments } = data;
    this.labels = labels;
    this.comments = comments;
  },
  methods: {
    load() {
      this.comments = this.comments.concat(this.comments.slice(0));
    },
    changelabel() {
      this.comments = this.breakArr(this.comments);
    },
    breakArr(arr) {
      arr = arr.slice();
      const len = arr.length;
      let i = len;
      let rand = 0;
      let temp;
      while (--i && i !== (rand = Math.floor(Math.random() * len))) {
        temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
      }
      return arr;
    }
  },
  data() {
    return {
      comments: {},
      labels: [],
      comments: []
    };
  }
};