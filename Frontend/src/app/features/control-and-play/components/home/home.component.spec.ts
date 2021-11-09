import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

import { CommandService } from 'src/app/core/services/command/command.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let commandServiceSpy;
    
    beforeEach(async () => {
        commandServiceSpy = createSpyFromClass(CommandService);

        //commandServiceSpy.leaveGroup.and.returnValue(Promise.resolve());
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: CommandService,
                    useValue: commandServiceSpy
                }
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
