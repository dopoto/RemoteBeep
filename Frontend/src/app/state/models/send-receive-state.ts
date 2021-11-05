import { BeepCommand } from 'src/app/core/models/beep-command';

export interface SendReceiveState {
    channel: string;
    connectionId?: string;
    devicesInChannel?: string[];
    recentCommands: BeepCommand[];
}