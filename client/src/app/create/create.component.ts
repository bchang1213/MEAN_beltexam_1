import { Component, OnInit } from '@angular/core';
import { PollService } from './../poll.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
	newPoll: object = {
		question:"",
		option1:{
			answer:"",
			votes:0
		},
		option2:{
			answer:"",
			votes:0
		},
		option3:{
			answer:"",
			votes:0
		},
		option4:{
			answer:"",
			votes:0
		},
		_user:""
	};

	constructor(private _pollService:PollService, private _router:Router) { }

	ngOnInit() {
	}

	submitPoll(){
		console.log("Hit submitpoll function.");
		this._pollService.savePoll(this.newPoll)
		.then((data)=>{
			console.log("then for savePoll:", data);
			this._router.navigate(['/dashboard']);
		})
		.catch((error)=>{
			console.log("error saving poll: ", error);
		})
	}

}
