import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InitModule } from './init/init.module';
import { CoreModule } from './core/core.module';
import { ControlAndPlayModule } from './features/control-and-play/control-and-play.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        InitModule,
        CoreModule.forRoot(),
        SharedModule,
        ControlAndPlayModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
