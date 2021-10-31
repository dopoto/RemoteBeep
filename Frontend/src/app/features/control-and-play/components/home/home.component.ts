import { Component } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    color = 'primary';
    mode: ProgressSpinnerMode = 'indeterminate';
    value = 50;
    displayProgressSpinner = false;
    spinnerWithoutBackdrop = false;
}
