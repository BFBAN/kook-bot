import config from "../../config";

class Http {
  public get address(): string {
    return `${config.site.protocol}://${config.site.origin}/`;
  }

  public get botServerAddress(): string {
    return `https://cabbagelol.net:6001/`
  }

  public get bfbanAddress(): string {
    return `https://api.bfban.com/`
  }
}

export default Http;
