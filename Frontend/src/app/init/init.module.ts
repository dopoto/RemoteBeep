import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommandService } from '../core/services/command/command.service';

import { LogService } from '../core/services/log/log.service';
import { ConfigService } from './services/config/config.service';

@NgModule({
    providers: [
        ConfigService,
        LogService,
        CommandService,
        {
            provide: APP_INITIALIZER,
            useFactory:
                (commandService: CommandService) =>
                () => {
                    commandService.init();
                },
            deps: [CommandService, HttpClient],
            multi: true,
        },
    ],
})
export class InitModule {}
