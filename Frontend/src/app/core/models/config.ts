export interface IConfig {
    production: boolean;
    version: string;
    clientBuildNumber: string,
    serverBuildNumber: string,
    apiEndpoint: string;
    corsConnectSrcWhiteList: string;
}