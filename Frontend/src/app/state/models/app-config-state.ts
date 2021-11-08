import { ComponentType } from "src/app/core/models/component-type";
import { ComponentUiState } from "src/app/core/models/component-ui-state";
import { AppNotification } from "../../core/models/app-notification";

export interface AppConfigState {
    lastNotification?: AppNotification;
    isLoading: boolean;
    isConnectedToServer: boolean;
    isInGeneralError: boolean;
    componentUiStates: { [key in ComponentType] : ComponentUiState }
}