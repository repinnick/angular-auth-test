import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorChangeService {
  color: object;
  private subject = new BehaviorSubject({});

  setColor(color: string): void {
    this.color = {background: color};
    this.subject.next(this.color);
  }

  updateColor(): Observable<any> {
    return this.subject.asObservable();
  }
}
