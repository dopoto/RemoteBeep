import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { AppState } from 'src/app/state/app.state';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;

    let store: MockStore;
    const initialState = {} as AppState;

    let viewContainerRefSpy: Spy<ViewContainerRef>;
    let overlayServiceSpy: Spy<OverlayService>;

    beforeEach(async () => {        
        const mockOverlayRef = { hasAttached: () => false };
        overlayServiceSpy = createSpyFromClass(OverlayService);
        overlayServiceSpy.createOverlay.and.returnValue(mockOverlayRef);

        await TestBed.configureTestingModule({
            declarations: [LoaderComponent],
            providers: [
                provideMockStore({ initialState }),
                {
                    provide: ViewContainerRef,
                    useValue: viewContainerRefSpy,
                },
                {
                    provide: OverlayService,
                    useValue: overlayServiceSpy,
                },
            ],
        }).compileComponents();
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
