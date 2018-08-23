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
	private runningExcercise : Excercise;
	private excercises: Excercise[] =[

	];

	getAvailableExcercises() {
		// slice() creates a copy of the available excercises so 
		// the component using it will edit the copy and not the 
		// original object in the service
		return this.availableExcercises.slice()
	}

	startExcercise(selectedId: string) {
		// we take the selected excercise (matched by ID), and store it into selectedExcercise
		const selectedExcercise = this.availableExcercises.find( ex => ex.id === selectedId);
		// we set the selectedExcercise as the running excercise
		this.runningExcercise = selectedExcercise;
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