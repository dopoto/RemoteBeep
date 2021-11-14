import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest,
} from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppState } from 'src/app/state/app.state';

import { CommandService } from './command.service';

describe('CommandService', () => {
    let service: CommandService;
    let store: MockStore;
    const initialState = {} as AppState;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
            providers: [
                CommandService, 
                provideMockStore({ initialState })
            ],
        }).compileComponents();
        service = TestBed.inject(CommandService);
        store = TestBed.inject(MockStore);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
