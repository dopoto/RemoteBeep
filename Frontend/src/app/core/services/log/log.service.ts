import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LogService {
    public info(message: string): void {
        console.log(message);
    }
}