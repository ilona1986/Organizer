import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TasksService} from "../shared/tasks.service";

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {

  form!: FormGroup;

  constructor(public dateService: DataService,
              private tasksService: TasksService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl( '', Validators.required)
    })
  }

  submit() {
    const {title} = this.form.value;

    const task: Task = {
      // @ts-ignore
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    }

    // @ts-ignore
    this.tasksService.create(task).subscribe(task => {
      console.log('New task', task)
      this.form.reset()
    }, err => console.error(err))
  }
}
