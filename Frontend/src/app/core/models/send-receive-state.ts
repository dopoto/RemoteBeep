import { BeepCommand } from "./beep-command";

export interface SendReceiveState {
    channel: string; // TODO Use on backend
    recentCommands: BeepCommand[];
}