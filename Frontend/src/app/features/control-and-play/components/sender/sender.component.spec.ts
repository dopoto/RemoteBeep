import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state/app.state';

import { SenderComponent } from './sender.component';

describe('SenderComponent', () => {
    let component: SenderComponent;
    let fixture: ComponentFixture<SenderComponent>;

    let store: MockStore;
    const initialState = {} as AppState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SenderComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SenderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
