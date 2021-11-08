import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state/app.state';

import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
    let component: PlayerComponent;
    let fixture: ComponentFixture<PlayerComponent>;
    let store: MockStore;
    const initialState = {} as AppState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PlayerComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlayerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
