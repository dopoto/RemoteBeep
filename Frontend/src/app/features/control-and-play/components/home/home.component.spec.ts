import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Spy } from 'jasmine-auto-spies';
import { CommandService } from 'src/app/core/services/command/command.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let commandServiceSpy: Spy<CommandService>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
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
