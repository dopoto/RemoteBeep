import { Component, HostListener } from '@angular/core';
import { CommandService } from 'src/app/core/services/command/command.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    constructor(private commandService: CommandService) {}

    /**
     * Returns a promise so that ngOnDestroy will wait for it to finish.
     */
    leaveGroup(): Promise<any> {
        return this.commandService.leaveGroup();
    }

    @HostListener('window:beforeunload')
    async ngOnDestroy() {
        await this.leaveGroup();
    }
}