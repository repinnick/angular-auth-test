import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorChangeService {
  color: string;
  private subject = new Subject<any>();

  setColor(color: string): void {
    return this.subject.next(color);
  }

  updateColor(): Observable<any> {
    return this.subject.asObservable();
  }
}
