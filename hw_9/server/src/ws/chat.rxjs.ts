import { Subject } from 'rxjs';

export const chatEvents$ = new Subject<{ event: string; data: any }>(); 