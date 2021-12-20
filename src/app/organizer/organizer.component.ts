import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksService} from "../shared/tasks.service";
import {switchMap} from "rxjs";
import {Task} from "../shared/tasks.service";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form!: FormGroup;
  tasks: Task[] = [];

  constructor(public dateService: DataService,
              public tasksService: TasksService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.tasksService.load(value))
    ).subscribe(tasks => {
      this.tasks = tasks
    })

    this.form = new FormGroup({
      title: new FormControl( '', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value;

    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    this.tasksService.create(task).subscribe(task => {
         this.form.reset()
    }, err => console.error(err))
  }

  remove(task: Task) {

  }
}
