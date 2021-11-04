import { BeepCommand } from "src/app/core/models/beep-command";

export interface SendReceiveState {
    channel: string;
    connectedClientsCount?: number;
    recentCommands: BeepCommand[];
}