import { AppNotification } from "./app-notification";

/**
 * State meta data.
 */
export interface MetaState {
    appVersion: string;
    stateVersion: string;
    initializedOn: Date;
    lastNotification?: AppNotification;
}