import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { OptionsComponent } from './components/options/options.component';
import { SenderComponent } from './components/sender/sender.component';
import { PlayerComponent } from './components/player/player.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        OptionsComponent,
        SenderComponent,
        PlayerComponent,
        NotificationsComponent,
        FooterComponent,
    ],
    imports: [BrowserModule, SharedModule],
    providers: [],
    bootstrap: [],
})
export class ControlAndPlayModule {}
