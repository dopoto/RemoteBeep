import {
    NgModule,
    SkipSelf,
    Optional,
    ModuleWithProviders,
} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { metaReducers, reducers } from './store/app.state';
import { HydrateEffects } from './store/effects/hydrate.effects';
import { SendReceiveEffects } from './store/effects/send-receive.effects';
import { PlaySoundsEffects } from './store/effects/play-sounds.effects';

/**
 * Module containing providers for the singleton services loaded when the application starts.
 * By convention, this module is only included in the app once, in AppModule (only in the import property
 * of the @NgModule()decorator in app.module.ts, not in any other module's import). This will ensure that
 * services inside it will be only created once in the entire app.
 *
 * @tutorial https://angular.io/guide/styleguide#application-structure-and-ngmodules
 * @tutorial https://stackoverflow.com/a/46622924
 *
 */
@NgModule({
    imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        // Instrumentation must be imported after importing StoreModule (config is optional)
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        }),
        EffectsModule.forRoot([HydrateEffects, SendReceiveEffects, PlaySoundsEffects])
    ],
    exports: [],
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only'
            );
        }
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [],
        };
    }
}
