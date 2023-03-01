import config from "../../config";

class Http {
  public get address(): string {
    return `${config.site.protocol}://${config.site.origin}/`;
  }
}

export default Http;
