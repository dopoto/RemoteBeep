import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxSwitchInputModule } from '@ngx-tiny/switch-input';

import { AppRoutingModule } from '../app-routing.module';

/**
 * Contains code (components, directives, and pipes) that will be used across feature modules in the app.
 * This module should be imported in the feature modules that need it.
 * It should NOT be imported in the main AppModule or CoreModule!
 * This module should consist entirely of declarations, most of them exported.
 * It may re-export other widget modules, such as CommonModule, FormsModule, and modules with the UI controls that you use most widely.
 * It should not have providers, nor should any of its imported or re-exported modules have providers.
 *
 * @tutorial https://angular.io/guide/styleguide#application-structure-and-ngmodules
 * @tutorial https://stackoverflow.com/a/46622924
 *
 */
@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatIconModule,
        MatSliderModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatCardModule,
        NgxSwitchInputModule,
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatIconModule,
        MatSliderModule,
        MatInputModule,
        MatButtonModule,
        MatGridListModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatCardModule,
        NgxSwitchInputModule,
        TranslateModule,
        AppRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [],
    entryComponents: [],
})
export class SharedModule {}
