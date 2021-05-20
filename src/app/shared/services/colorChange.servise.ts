import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorChangeService {
  private subject = new BehaviorSubject({});

  setColor(color: string): void {
    this.subject.next({background: color});
  }

  updateColor(): Observable<object> {
    return this.subject.asObservable();
  }
}
