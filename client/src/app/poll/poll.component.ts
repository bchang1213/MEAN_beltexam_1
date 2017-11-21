import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from './../poll.service';


@Component({
	selector: 'app-poll',
	templateUrl: './poll.component.html',
	styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
	thisPoll: object;
	pollid: any;

	constructor(private _route: ActivatedRoute, private _pollService: PollService) {
		this._route.paramMap.subscribe( params => {
			console.log("the param id is: ",params.get('id'));
			this.pollid = params.get('id');
		})
		console.log("new pollid: ", this.pollid);
		this.getPoll();
	}

	ngOnInit() {
	}

	getPoll(){
		this._pollService.getOnePoll(this.pollid)
		.then((data)=>{
			console.log("then:", data);
			this.thisPoll = data;
			console.log("thispoll: ", this.thisPoll);
		})
		.catch((error)=>{
			console.log("error: ", error);
		})
	}

	increaseVote(number, pId){
		console.log("increased vote function");
		this._pollService.updatePoll(number,pId)
		.then((data)=>{
			console.log("updated poll: ", data);
			this.getPoll();
		})
		.catch((error)=>{
			console.log("error increasing vote: ", error);
		})
	}
}