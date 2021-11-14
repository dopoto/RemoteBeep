import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IConfig } from 'src/app/core/models/config';
import { environment } from 'src/environments/environment';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    let originalEnvironment = {} as IConfig;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FooterComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        originalEnvironment.version = environment.version;
        originalEnvironment.clientBuildNumber = environment.clientBuildNumber;
        originalEnvironment.serverBuildNumber = environment.serverBuildNumber;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize properties', () => {
        environment.version = "v";
        environment.clientBuildNumber = "cb";
        environment.serverBuildNumber = "sb";

        component.ngOnInit();

        expect(component.version).toEqual('v');
        expect(component.clientBuildNumber).toEqual('cb');
        expect(component.serverBuildNumber).toEqual('sb');
    });

    afterEach(() => {
        environment.version = originalEnvironment.version;
        environment.clientBuildNumber = originalEnvironment.clientBuildNumber;
        environment.serverBuildNumber = originalEnvironment.serverBuildNumber;
    });
});
