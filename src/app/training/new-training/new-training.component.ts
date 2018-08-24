import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})

export class NewTrainingComponent implements OnInit, OnDestroy {

  excercises: Excercise[];
  excerciseSubscription: Subscription;

  constructor(private trainingService : TrainingService) { }

  ngOnInit() {
    this.excerciseSubscription = this.trainingService.excercisesChanged.subscribe(excercises => this.excercises = excercises);
    this.trainingService.fetchAvailableExcercises();
  }

  onStartTraining(form: NgForm) {
  	this.trainingService.startExcercise(form.value.excercise);
  }

  ngOnDestroy() {
    this.excerciseSubscription.unsubscribe();
  }
}
