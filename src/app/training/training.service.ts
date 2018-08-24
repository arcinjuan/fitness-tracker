import { Injectable } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';

import { Excercise } from './excercise.model';

@Injectable()
export class TrainingService {
	excerciseChanged = new Subject<Excercise>();
	excercisesChanged = new Subject<Excercise[]>();
	private availableExcercises: Excercise[] = []
	private runningExcercise : Excercise;
	private excercises: Excercise[] =[];

	constructor(private db: AngularFirestore) {}
	fetchAvailableExcercises() {
		this.db
    .collection('availableExcercises')
    .snapshotChanges()
    .map(docArray => {
      return docArray.map(doc =>{
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          calories: doc.payload.doc.data().calories,
          duration: doc.payload.doc.data().duration
        };
      });
    })
    .subscribe((excercises: Excercise[]) => {
    	this.availableExcercises = excercises;
    	this.excercisesChanged.next([...this.availableExcercises]);
    })
	}

	startExcercise(selectedId: string) {
		this.runningExcercise = this.availableExcercises.find(ex => ex.id === selectedId);
		this.excerciseChanged.next({...this.runningExcercise})
	}

	completeExcercise() {
		this.excercises.push({ ...this.runningExcercise, date: new Date(), state: 'completed'});
		this.runningExcercise = null;
		this.excerciseChanged.next(null);
	}

	cancelExcercise(progress: number) {
		this.excercises.push({ 
			...this.runningExcercise, 
			duration: this.runningExcercise.duration * (progress / 100), 
			calories: this.runningExcercise.calories * (progress / 100),
			date: new Date(), 
			state: 'cancelled'
		});

		this.runningExcercise = null;
		this.excerciseChanged.next(null);
	}

	getRunningExcercise() {
		return { ...this.runningExcercise }
	}

	getCompletedOrCancelledExcercises() {
		return this.excercises.slice();
	}
}