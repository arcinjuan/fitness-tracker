import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  excercises: Excercise[] = [];
  
  constructor(private trainingService : TrainingService) { }

  ngOnInit() {
    this.excercises = this.trainingService.getAvailableExcercises();
  }

  onStartTraining(form: NgForm) {
  	this.trainingService.startExcercise(form.value.excercise);
  }
}
