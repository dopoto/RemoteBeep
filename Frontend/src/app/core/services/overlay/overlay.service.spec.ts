import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

import { OverlayService } from './overlay.service';

describe('OverlayService', () => {
    let service: OverlayService;
    let overlayServiceSpy: Spy<OverlayService>;
    
    beforeEach(() => {
        overlayServiceSpy = createSpyFromClass(OverlayService);
        TestBed.configureTestingModule({
            declarations: [],
            imports: [HttpClientTestingModule],
            providers: [
                OverlayService,
                {
                    provide: OverlayService,
                    useValue: overlayServiceSpy,
                },
            ],
        }).compileComponents();
        service = TestBed.inject(OverlayService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
