import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { reducers, metaReducers } from './app.state';
import { AppConfigEffects } from './effects/app-config.effects';
import { HydrateEffects } from './effects/hydrate.effects';
import { PlaySoundsEffects } from './effects/play-sounds.effects';
import { RouterEffects } from './effects/router.effects';
import { SendReceiveEffects } from './effects/send-receive.effects';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterModule.forRoot([]),
        StoreRouterConnectingModule.forRoot({ routerState: RouterState.Minimal}),
        // Instrumentation must be imported after importing StoreModule (config is optional)
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        }),
        EffectsModule.forRoot([
            HydrateEffects,
            AppConfigEffects,
            RouterEffects,
            SendReceiveEffects,
            PlaySoundsEffects,
        ]),
    ],
    exports: [
    ],
    providers: [],
    bootstrap: [],
    entryComponents: [],
})
export class StateModule {}
