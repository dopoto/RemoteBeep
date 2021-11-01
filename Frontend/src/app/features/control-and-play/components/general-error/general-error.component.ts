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
  selector: 'app-general-error',
  templateUrl: './general-error.component.html',
  styleUrls: ['./general-error.component.scss']
})
export class GeneralErrorComponent {
  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = false;

  @ViewChild('errorMessageRef')
  private errorMessageRef: TemplateRef<any> | undefined;
  private errorMessageOverlayConfig!: OverlayConfig;
  private overlayRef!: OverlayRef;

  ngDestroyed$ = new Subject();

  displayErrorMessage = false;

  constructor(
      private vcRef: ViewContainerRef,
      private overlayService: OverlayService,
      private readonly store: Store<AppState>
  ) {
      this.store
          .pipe(takeUntil(this.ngDestroyed$), select(selector))
          .subscribe((res) => {
              this.displayErrorMessage = res.isInGeneralError;
          });
  }

  ngOnInit() {
      // Config for Overlay Service
      this.errorMessageOverlayConfig = {
          hasBackdrop: this.backdropEnabled,
      };
      if (this.positionGloballyCenter) {
          this.errorMessageOverlayConfig['positionStrategy'] =
              this.overlayService.positionGloballyCenter();
      }
      // Create Overlay for progress spinner
      this.overlayRef = this.overlayService.createOverlay(
          this.errorMessageOverlayConfig
      );
  }

  ngDoCheck() {
      // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
      if (
          this.displayErrorMessage &&
          !this.overlayRef.hasAttached() &&
          this.errorMessageRef
      ) {
          this.overlayService.attachTemplatePortal(
              this.overlayRef,
              this.errorMessageRef,
              this.vcRef
          );
      } else if (
          !this.displayErrorMessage &&
          this.overlayRef.hasAttached()
      ) {
          this.overlayRef.detach();
      }
  }

  ngOnDestroy() {
      this.ngDestroyed$.next(null);
  }
}

