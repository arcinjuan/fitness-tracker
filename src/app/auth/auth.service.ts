import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';

// @Injectable allows us to bring a service into a service
// in this case we need it to bring in the Router service
@Injectable()
export class AuthService {
	// Subject is an rxjs version of EventEmitter
	authChange = new Subject<boolean>();
	private isAuthenticated = false;

	constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {}

	// on register or login turn user into an object
	registerUser(authData: AuthData){
		this.afAuth.auth.createUserWithEmailAndPassword(
			authData.email, 
			authData.password
		).then(result => {
			this.authSuccessfully('/training');
		})
		.catch( error => {
			console.log(error);
		})
		this.authSuccessfully('/training');
	}

	login(authData: AuthData){
		this.afAuth.auth.signInWithEmailAndPassword(
			authData.email,
			authData.password
		).then(result => {
			console.log(result);
			this.authSuccessfully('/training');
		})
		.catch( error => {
			console.log(error);
		})
		this.authSuccessfully('/training');
	}


	// on logout get rid of user
	logout() {
    this.trainingService.cancelSubscriptions();
    this.afAuth.auth.signOut();
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
	}

	// check to see if user is NOT null
	// when not null, user is authenticated
	isAuth() {
		return this.isAuthenticated;
	}

	private authSuccessfully(navigateTo) {
		this.isAuthenticated = true;
		// emmit that there was a change in Authentication. Set to true 
		this.authChange.next(true);
		this.router.navigate([navigateTo]);

	}
}