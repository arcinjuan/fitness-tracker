import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

// @Injectable allows us to bring a service into a service
// in this case we need it to bring in the Router service
@Injectable()
export class AuthService {
	// Subject is an rxjs version of EventEmitter
	authChange = new Subject<boolean>();

	// store the currently authenticated user (grabbed from user.model)
	// by making this a private field, we can only access it form inside this service
	private user: User;

	constructor(private router: Router, private afAuth: AngularFireAuth) {}

	// on register or login turn user into an object
	registerUser(authData: AuthData){
		this.afAuth.auth.createUserWithEmailAndPassword(
			authData.email, 
			authData.password
		).then(result => {
			console.log(result);
			this.authSuccessfully();
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
			this.authSuccessfully();
		})
		.catch( error => {
			console.log(error);
		})
		this.authSuccessfully('/training');
	}


	// on logout get rid of user
	logout() {
		this.user = null
		// emmit that there was a change in Authentication. Set to false
		this.authChange.next(false);
		this.authSuccessfully('/login');
	}

	// returns the value of user
	getUser(){
		// return the user object. By spreading it (...) we dont return the original object. 
		// since it's set to private it isnt shareable outside the service anyway
		// so we spread it to create a new shareable copy of the object. This also helps 
		// ensure that the original object is not changed or affected within the service.
		// only the copy is manipulated. 
		return { ...this.user };
	}

	// check to see if user is NOT null
	// when not null, user is authenticated
	isAuth() {
		return this.user != null;
	}

	private authSuccessfully(navigateTo) {
		// emmit that there was a change in Authentication. Set to true 
		this.authChange.next(true);
		this.router.navigate([navigateTo]);

	}
}