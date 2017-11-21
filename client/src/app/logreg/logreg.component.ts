import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-logreg',
	templateUrl: './logreg.component.html',
	styleUrls: ['./logreg.component.css']
})
export class LogregComponent implements OnInit {
	newUser: object = {name:""};

	constructor(private _userService:UserService, private _router: Router) { }

	ngOnInit() {
	}

	onSubmit(){
		console.log("submitted this user from form: ", this.newUser);
		this._userService.register(this.newUser)
		.then((data)=>{
			console.log("then:", data);
			this._router.navigate(['/dashboard']);
		})
		.catch((error)=>{
			console.log("error: ", error);
		})
	}
}
