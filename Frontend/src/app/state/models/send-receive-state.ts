import { BeepCommand } from 'src/app/core/models/beep-command';

export interface SendReceiveState {
    group: string;
    connectionId?: string;
    devicesInGroup?: string[];
    recentCommands: BeepCommand[];
}