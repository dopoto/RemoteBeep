import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Spy } from 'jasmine-auto-spies';

import { AppState } from 'src/app/state/app.state';
import { NotificationsComponent } from './notifications.component';

describe('NotificationsComponent', () => {
    let component: NotificationsComponent;
    let fixture: ComponentFixture<NotificationsComponent>;
    let store: MockStore;
    const initialState = {} as AppState;
    let matSnackBarSpy: Spy<MatSnackBar>;
    
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotificationsComponent],
            providers: [
                provideMockStore({ initialState }),
                {
                    provide: MatSnackBar,
                    useValue: matSnackBarSpy
                }
            ],
        }).compileComponents();
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
