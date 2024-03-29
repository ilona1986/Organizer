import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService implements moment.Moment {

  // @ts-ignore
  public date: BehaviorSubject<any> = new BehaviorSubject(moment());

 changeMonth(dir: number) {
   const value = this.date.value.add(dir, 'month');
   this.date.next(value);
 }

 changeDate(date: moment.Moment) {
   const value = this.date.value.set({
     date: date.date(),
     month: date.month()
   })
   this.date.next(value);
 }
}
