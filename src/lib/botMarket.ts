import axios from "axios";
import config from "../../config";

class BotMarket {
  immediate: any;
  intervalTime: number = 1000 * 60 * 30; // 30m

  constructor() {
    const that = this;
    if (config.__DEBUG__) return;
    this.immediate = setInterval(function() {
      that.upDateOnline()
    }, that.intervalTime);
  }

  stop () {
    clearInterval(this.immediate);
  }

  /**
   * botMarket 心跳
   */
  upDateOnline() {
    if (config.botMarket && config.botMarket.uuid) return;

    axios({
      url: `http:/${config.botMarket.origin}/api/v1/online.bot`,
      method: "get",
      headers: {
        "uuid": config.botMarket.uuid
      }
    });
  }
}

export default BotMarket;
