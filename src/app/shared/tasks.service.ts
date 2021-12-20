import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import * as moment from "moment";

export interface Task {
  id?: string
  title: string
  date: string
}

interface CreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  static url ='https://angular-calendar-1caa1-default-rtdb.europe-west1.firebasedatabase.app/tasks'

  constructor(private http: HttpClient) { }

  load(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map(tasks => {
        if (!tasks) {
          return []
        }

        // @ts-ignore
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}));
      }));
  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse >(`${TasksService.url}/${task.date}.json`, task)
      .pipe(map(response => {
        return {...task, id: response.name}
      }))
  }
}
