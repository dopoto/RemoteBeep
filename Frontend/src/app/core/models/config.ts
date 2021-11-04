export interface IConfig {
    production: boolean;
    version: string;
    clientBuildNumber: string,
    serverBuildNumber: string,
    serverUrl: string;
    corsConnectSrcWhiteList: string;
}