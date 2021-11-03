import {
    NgModule,
    SkipSelf,
    Optional,
    ModuleWithProviders,
} from '@angular/core';

import { StateModule } from '../state/state.module';

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
        StateModule
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
