export enum HydrateActionTypes {
    hydrateStart = 'hydrateStart',
    hydrateOk = 'hydrateOk',
    hydrateError = 'hydrateError',
}

export enum SendReceiveActionTypes {
    initStart = 'sendReceiveInitStart',
    initOk = 'sendReceiveInitOk',
    initError = 'sendReceiveInitError',
    sendBeepCommandStart = 'sendBeepCommandStart',
    sendBeepCommandOk = 'sendBeepCommandOk',
    sendBeepCommandError = 'sendBeepCommandError',
}

export enum PlaySoundsActionTypes {
    beginPlayStart = 'beginPlayStart',
    beginPlayOk = 'beginPlayOk',
    beginPlayError = 'beginPlayError',

    stopPlayStart = 'stopPlayStart',  // Yeah, I know...
    stopPlayOk = 'stopPlayOk',
    stopPlayError = 'stopPlayError',

    changePlayModeStart = 'changePlayModeStart',
    changePlayModeOk = 'changePlayModeOk'
}
