import { PanelType } from "src/app/core/models/panel-type";
import { AppNotification } from "../../core/models/app-notification";

export interface AppConfigState {
    appVersion: string;
    stateVersion: string;
    initializedOn: Date;
    lastNotification?: AppNotification;
    isLoading: boolean;
    isConnectedToServer: boolean;
    isInGeneralError: boolean;
    panelStates: { [key in PanelType] : { isExpanded: boolean } }
    // isGroupInfoExpanded: boolean;
    // isPlayModeExpanded: boolean;
    // isSoundPlayerExpanded: boolean;
    // isControlExpanded: boolean;
}