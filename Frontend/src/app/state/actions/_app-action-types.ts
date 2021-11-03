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
    emitNotification = 'emitNotification'
}

export enum SendReceiveActionTypes {
    changeChannel = 'changeChannel',
    changeChannelOk = 'changeChannelOk',
    sendBeepCommandStart = 'sendBeepCommandStart',
    sendBeepCommandOk = 'sendBeepCommandOk',
    sendBeepCommandError = 'sendBeepCommandError',
}

export enum PlaySoundsActionTypes {
    beginPlayStart = 'beginPlayStart',
    beginPlayOk = 'beginPlayOk',
    beginPlayError = 'beginPlayError',
    stopPlayStart = 'stopPlayStart',
    stopPlayOk = 'stopPlayOk',
    stopPlayError = 'stopPlayError',
    changePlayMode= 'changePlayMode',
    changeFreq = 'changeFreq',
    changeDuration = 'changeDuration',
}
