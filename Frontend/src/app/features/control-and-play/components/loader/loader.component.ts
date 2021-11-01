import {
    Component,
    Input,
    ViewChild,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { OverlayRef } from '@angular/cdk/overlay';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { OverlayConfig } from '@angular/cdk/overlay';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import { Subject, takeUntil } from 'rxjs';
import {
    selector,
} from 'src/app/core/store/selectors/app-config.selectors';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
    @Input() diameter?: number = 100;
    @Input() mode: ProgressSpinnerMode = 'indeterminate';
    @Input() strokeWidth?: number;
    @Input() value: number = 0;
    @Input() backdropEnabled = true;
    @Input() positionGloballyCenter = false;

    @ViewChild('progressSpinnerRef')
    private progressSpinnerRef: TemplateRef<any> | undefined;
    private progressSpinnerOverlayConfig!: OverlayConfig;
    private overlayRef!: OverlayRef;

    ngDestroyed$ = new Subject();

    displayProgressSpinner = false;

    constructor(
        private vcRef: ViewContainerRef,
        private overlayService: OverlayService,
        private readonly store: Store
    ) {
        this.store
            .pipe(takeUntil(this.ngDestroyed$), select(selector))
            .subscribe((res) => {
                this.displayProgressSpinner = res.isLoading;
            });
    }

    ngOnInit() {
        // Config for Overlay Service
        this.progressSpinnerOverlayConfig = {
            hasBackdrop: this.backdropEnabled,
        };
        if (this.positionGloballyCenter) {
            this.progressSpinnerOverlayConfig['positionStrategy'] =
                this.overlayService.positionGloballyCenter();
        }
        // Create Overlay for progress spinner
        this.overlayRef = this.overlayService.createOverlay(
            this.progressSpinnerOverlayConfig
        );
    }

    ngDoCheck() {
        // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
        if (
            this.displayProgressSpinner &&
            !this.overlayRef.hasAttached() &&
            this.progressSpinnerRef
        ) {
            this.overlayService.attachTemplatePortal(
                this.overlayRef,
                this.progressSpinnerRef,
                this.vcRef
            );
        } else if (
            !this.displayProgressSpinner &&
            this.overlayRef.hasAttached()
        ) {
            this.overlayRef.detach();
        }
    }

    ngOnDestroy() {
        this.ngDestroyed$.next(null);
    }
}
