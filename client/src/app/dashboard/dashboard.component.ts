import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { PollService } from './../poll.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	currentUser:object = {name: ""};
	searchString: string;
	showPolls: any[];

	constructor(private _userService:UserService, private _pollService:PollService, private _router: Router) { }

	ngOnInit() {
		this._userService.getCurrentUser()
		.then((data)=>{
			this.currentUser = data;
			console.log("Printing current user: ", this.currentUser);
		})
		.catch((error)=>{
			console.log(error);
		})
		this.getAllPolls();
	}

	getAllPolls(){
		this._pollService.getPolls()
		.then((data)=>{
			this.showPolls = data;
			console.log("All polls retrieved.");
			console.log("print polls:",this.showPolls);
		})
		.catch((error)=>{
			console.log("Error whilst retrieving all polls: ", error);
		})
	}

	deletePoll(pollId){
		this._pollService.deletePoll(pollId)
		.then((data)=>{
			console.log("tried to delete poll.");
			this.getAllPolls();
			this._router.navigate(['/dashboard']);
		})
		.catch((error)=>{
			console.log("caught an error when deleting poll: ", error);
		})
	}

	logout(){
		this._pollService.loggedOut();
		this._router.navigate(['']);
	}
}
