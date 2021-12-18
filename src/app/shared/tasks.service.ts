import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

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

  static url ='https://angular-calendar-1caa1-default-rtdb.europe-west1.firebasedatabase.app/'

  constructor(private http: HttpClient) { }

  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse >(`${TasksService.url}/${task.date}.json`, task)
      .pipe(map(response => {
        return {...task, id: response.name}
      }))
  }
}
