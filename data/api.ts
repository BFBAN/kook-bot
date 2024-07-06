import {HttpContainer} from "./baseHttp";

interface RobotServer {
    development: HttpContainer;
    production: HttpContainer;
}

interface RobotCommunityServer {
    development: HttpContainer;
    production: HttpContainer;
}

interface DocsServer {
    development: HttpContainer;
    production: HttpContainer;
}

interface BfbanServer {
    development: HttpContainer;
    production: HttpContainer;
}

interface HostConfig {
    robotServer: RobotServer | undefined;
    robotCommunityServer: RobotCommunityServer | undefined;
    docs: DocsServer | undefined;
    bfban: BfbanServer | undefined;
}

export type {
    HostConfig,
    BfbanServer,
    DocsServer,
    RobotServer,
    RobotCommunityServer,
}
