import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorChangeService {
  color: any;
  private subject = new Subject<any>();

  setColor(color: string): void {
    this.color = color;
    return this.subject.next({background: color});
  }

  updateColor(): Observable<any> {
    return this.subject.asObservable();
  }
}
