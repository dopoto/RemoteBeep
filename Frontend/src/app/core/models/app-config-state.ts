import { AppNotification } from "./app-notification";

export interface AppConfigState {
    appVersion: string;
    stateVersion: string;
    initializedOn: Date;
    lastNotification?: AppNotification;
    isLoading: boolean;
    isConnectedToServer: boolean;
}