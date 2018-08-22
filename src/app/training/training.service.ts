import { Subject } from 'rxjs/subject';

import { Excercise } from './excercise.model';


export class TrainingService {
	excerciseChanged = new Subject<Excercise>();
	private availableExcercises: Excercise[] = [
		{id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
		{id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
		{id: 'side-lounges', name: 'Side Lunges', duration: 120, calories: 18},
		{id: 'burpees', name: 'Burpees', duration: 60, calories: 8},
	];
	// store the users selected excercise
	private runningExcercise : Excercise

	getAvailableExcercises() {
		// slice() creates a copy of the available excercises so 
		// the component using it will edit the copy and not the 
		// original object in the service
		return this.availableExcercises.slice()
	}

	startExcercise(selectedId: string) {

    console.log('test')
		// we take the selected excercise (matched by ID), and store it into selectedExcercise
		const selectedExcercise = this.availableExcercises.find( ex => ex.id === selectedId);
		// we set the selectedExcercise as the running excercise
		this.runningExcercise = selectedExcercise;
		this.excerciseChanged.next({...this.runningExcercise})
	}

	getRunningExcercise() {
		return { ...this.runningExcercise }
	}
}