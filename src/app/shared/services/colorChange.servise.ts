import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

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

  updateColor(): Observable<object> {
    return this.subject.asObservable();
  }
}
