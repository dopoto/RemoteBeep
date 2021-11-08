import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state/app.state';

import { GroupInfoComponent } from './group-info.component';

describe('GroupInfoComponent', () => {
    let component: GroupInfoComponent;
    let fixture: ComponentFixture<GroupInfoComponent>;
    let store: MockStore;
    const initialState = {} as AppState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GroupInfoComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
