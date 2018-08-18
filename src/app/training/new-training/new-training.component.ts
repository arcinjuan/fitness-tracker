import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

	@Output() trainingStart = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  excercises = [
  	{value: 'situps-0', viewValue: 'Situps'},
    {value: 'pushups-1', viewValue: 'Pushups'},
    {value: 'jumping-jacks-2', viewValue: 'Jumping Jacks'}
  ]

  onStartTraining() {
  	this.trainingStart.emit()
  }
}
