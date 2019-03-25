import { getLocation } from "root/getData";

import {
  GET_CURCITY
} from "./mutation-types";
import { setStorage, getStorage } from "lib/utils";

export default {
  async getPositionAction({ commit }, query) {
    const flag = getStorage("currentCity", { type: "session" });
    if (flag !== null) {
      commit(GET_CURCITY, flag);
    } else {
      const res = await getLocation(query);
      if (res.code === 0) {
        setStorage("currentCity", res.data, { type: "session" });
        commit(GET_CURCITY, res.data);
      }
    }
  }
};
