export enum HydrateActionTypes {
    hydrateStart = 'hydrateStart',
    hydrateOk = 'hydrateOk',
    hydrateError = 'hydrateError',
}

export enum AppConfigActionTypes {
    initStart = 'initStart',
    initOk = 'initOk',
    initError = 'initError',
}

export enum SendReceiveActionTypes {
    sendReceiveInit = 'sendReceiveInit',
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
