import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';

import { PlayService } from './play.service';

describe('PlayService', () => {
    let service: PlayService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
            providers: [
                PlayService,
            ],
        }).compileComponents();
        service = TestBed.inject(PlayService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
