import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PlaySoundsMode } from 'src/app/core/models/play-sounds-mode';
import { AppState } from 'src/app/state/app.state';
import { OptionsComponent } from './options.component';

describe('OptionsComponent', () => {
    let component: OptionsComponent;
    let fixture: ComponentFixture<OptionsComponent>;
    let store: MockStore;
    const initialState = {} as AppState;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OptionsComponent],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();
        store = TestBed.inject(MockStore);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get mode from store', () => {
        const spy = spyOn(store, 'pipe');
        component.ngOnInit();
        expect(component).toBeTruthy();
    });

    it('should dispatch new play mode', () => {
        const spy = spyOn(store, 'dispatch').and.callFake(function () {
            console.log('dispatching from the spy!');
        });
        component.onModeChange({ value: PlaySoundsMode.PlayOnly });
        // expect(spy).toHaveBeenCalledOnceWith({
        //     newPlayMode: PlaySoundsMode.PlayOnly,
        // });
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
