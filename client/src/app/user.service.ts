import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

	constructor(private _http: Http) { }
	
	register(userObject){
		var registerUserCall = this._http.post('/users', userObject);
		return registerUserCall.map(Response=>Response.json()).toPromise();
	}

	getCurrentUser(){
		var getUser = this._http.get('/users/current');
		return getUser.map(Response=>Response.json()).toPromise();
	}
}
