import { BeepCommand } from "./beep-command";

export interface SendReceiveState {
    channel: string;
    recentCommands: BeepCommand[];
}