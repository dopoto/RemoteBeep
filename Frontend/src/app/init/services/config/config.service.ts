import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { IConfig } from '../../../core/models/config';

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    config: IConfig | null = null;
    
    constructor() {
        this.config = {
            ...environment
        };
    }
}
