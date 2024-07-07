import { bot } from "../../bot";
import { filtration } from "../../lib/util";

declare class baseCommandFactory {

}

// 白名单参数字段
const fieldConf = {
  "v": { "min": 0, "max": 10, "type": "string" },
  "type": {},
  "time": {}
};

class baseCommandData {
  public data: Map<any, any> = new Map<any, any>();

  /**
   * 取得指令第一参数
   */
  public get mainValue(): any {
    if (this.data && !this.data.has(0)) {
      return undefined;
    }
    return this.data?.get(0);
  };

  /**
   * 取得除第一位参数外字段
   */
  public get other(): Map<any, any> {
    let parameter: Map<any, any> = new Map();
    this.data.forEach((value, key) => {
      if (typeof key != "number") {
        parameter.set(key, value);
      }
    });
    return parameter;
  }

  get version(): string {
    return this.other.get("v") ?? null;
  };

  get lang(): string {
    return this.other.get("lang") ?? null;
  }

  get debug(): string {
    return this.other.get("debug") ?? null;
  }
}

class CommandFactory {
  /***
   * 打包ages的命令
   * @param ages
   */
  pack(ages: Array<any>): baseCommandData {
    let command: baseCommandData = new baseCommandData();

    try {
      if (ages.length <= 0) {
        throw "There is no value in the ages, please check";
      }

      for (let index = 0; index < ages.length; index++) {
        let item = ages[index];
        item.indexOf(":");
        if (item.indexOf(":") >= 0) {
          let splitString = item.split(":");
          const key = splitString[0];
          const val = splitString[1];

          if (!key || !val) {
            continue;
          }

          command.data?.set(key, filtration(val));
        } else {
          command.data?.set(index, filtration(item));
        }
      }

      return command;
    } catch (e) {
      bot.logger.debug(e);
    }

    return command;
  }
}

export default {
  CommandFactory,
  baseCommandData
};
