import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PollService {

	constructor(private _http:Http) { }
	
	savePoll(pollObject){
		var savePollToDB = this._http.post('/polls', pollObject);
		return savePollToDB.map(Response=>Response.json()).toPromise();
	}

	getPolls(){
		var pollsRequest = this._http.get('/polls');
		return pollsRequest.map(Response=>Response.json()).toPromise();
	}

	getOnePoll(pId){
		var pollRequest = this._http.get('/poll/'+pId);
		return pollRequest.map(Response=>Response.json()).toPromise();
	}

	deletePoll(pId){
		return this._http.delete('/poll/'+pId).toPromise();
	}

	loggedOut(){
		console.log();
	}

	updatePoll(number, pId){
		var updateRequest = this._http.get('/poll/'+pId+'/'+number);
		return updateRequest.map(Response=>Response.json()).toPromise();
	}
}
