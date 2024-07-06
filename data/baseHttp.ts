enum BaseHttpType {Https = 'https', Http = 'http'}

interface BaseHttp {
    protocol: BaseHttpType;
    host: string
    pathname?: string
}

class HttpContainer {
    protocol: BaseHttpType;
    host: string
    pathname?: string

    public constructor({protocol, host, pathname}: BaseHttp) {
        this.protocol = protocol || BaseHttpType.Http;
        this.host = host;
        if (pathname)
            this.pathname = pathname;
        return this;
    }

    // 取出地址
    get url(): string {
        return `${this.protocol || BaseHttpType.Http}://${this.host ??= ''}${this.pathname ??= ''}`;
    }

    clear(): this {
        this.protocol = BaseHttpType.Http;
        this.host = ""
        this.pathname = ""
        return this;
    }
}

export {
    BaseHttpType,
    HttpContainer
}
