/**
 * All actions supported by the application.
 */

export enum HydrateActionTypes {
    hydrateStart = 'hydrateStart',
    hydrateOk = 'hydrateOk',
    hydrateError = 'hydrateError',
}

export enum AppConfigActionTypes {
    initStart = 'initStart',
    initOk = 'initOk',
    initError = 'initError',
    emitNotification = 'emitNotification',
    expandPanel = 'expandPanel',
    collapsePanel = 'collapsePanel',
    updateComponentUiStates = 'updateComponentUiStates'
}

export enum SendReceiveActionTypes {
    changeGroup = 'changeGroup',
    changeGroupOk = 'changeGroupOk',
    updateConnectionId = 'updateConnectionId',
    addClientToGroup = 'addClientToGroup',
    removeClientFromGroup = 'removeClientFromGroup',
    updateListOfClientsConnectedToGroup = 'updateListOfClientsConnectedToGroup',
    sendBeepCommandStart = 'sendBeepCommandStart',
    sendBeepCommandOk = 'sendBeepCommandOk',
    sendBeepCommandError = 'sendBeepCommandError',
    sendStopCommand = 'sendStopCommand',
}

export enum PlaySoundsActionTypes {
    requestPlay = 'requestPlay',
    playOk = 'playOk',
    playError = 'playError',
    requestStop = 'requestStop',
    stopOk = 'stopOk',
    stopError = 'stopError',
    changePlayMode = 'changePlayMode',
    changeFreq = 'changeFreq',
    changeDuration = 'changeDuration',
}
