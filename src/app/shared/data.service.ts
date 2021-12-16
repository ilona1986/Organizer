import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService implements moment.Moment {

  // @ts-ignore
  public date: BehaviorSubject<any> = new BehaviorSubject(moment());

  constructor() { }
}
