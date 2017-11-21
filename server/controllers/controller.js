var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var User = mongoose.model('User');

module.exports = {
	findPolls: function(request, response) {
		Poll.find().populate('user').exec(function(error, polls){
			if(error){
				console.log("Error finding polls in db: ", error);
			}
			else{
				console.log("Found polls in db.");
				response.json(polls);
			}			
		})
		// Poll.find({}, function(error, polls) {
		// 	if(error){
		// 		console.log("Error finding polls in db: ", error);
		// 	}
		// 	else{
		// 		console.log("Found polls in db.");
		// 		response.json(polls);
		// 	}
		// })
	},

	logout: (request, response)=>{
		request.session.destroy();
	},

	register: function(request, response) {
		User.find({name:request.body.name}, (error, foundUsers)=>{
			if(error){
				console.log("Error while attempting to find user in db: ", error);
			}
			if(foundUsers.length > 0){
				console.log("Found an existing user based off of the provided name.");
				request.session.userId = foundUsers[0]._id;
				response.json(foundUsers[0]);
			}
			else{
				var newUser = new User(request.body);
				newUser.save((error, savedUser)=>{
					if(error){
						console.log("Error while attempting to save user to db.");
						response.json(error);
					}
					else{
						console.log("registered a new user in the db");
						request.session.userId = savedUser;
						response.json(savedUser);
					}
				})
			}
		})
	},

	findPoll: function(request, response){
		console.log("this is the id we need to use to find: ", request.params.id);
		Poll.findOne({_id:request.params.id}).populate('user').exec(function(error, foundPoll){
			if(error){
				console.log('found error: ', error);
				response.json(false);
			}
			else{
				console.log("found one user.");
				console.log("this is the found user: ", foundPoll);
				response.json(foundPoll);
			}
		})
	},

	createPoll: function(request, response){
		var newPoll = new Poll(request.body);
		console.log("this is the user who is saving the poll: ", request.session.userId);
		newPoll.user = request.session.userId;
		newPoll.save((error, savedPoll)=>{
			if(error){
				console.log("Error while attempting to save poll: ", error);
				response.json(error);
			}
			else{
				console.log("saved new poll into db.");
				response.json(savedPoll);
			}
		})
	},

	getCurrentUser: function(request, response){
		if(request.session.userId != undefined){
			console.log("This is the current session id: ", request.session.userId);
			User.findOne({_id: request.session.userId}, (error, loggedUser)=>{
				console.log("found a user");
				response.json(loggedUser);
			})
		}
		else{
			console.log("Nobody was logged in.");
			response.json({message:"Not logged in."});
		}
	},

	deletePoll: function(request, response){
		Poll.remove({_id: request.params.id}, (error)=>{
			response.json(true);
		})
	},

	updatePoll: function(request, response){
		var optionNum = request.params.number;
		var pollId = request.params.id;
		console.log("poll id we need to update:", pollId);
		console.log("This is the optiont that we want to update: ", optionNum);
		if(optionNum == 1){
			Poll.update({_id:pollId}, {$inc : {'option1.votes' : 1}}, function(error, result){
				if(error){
					console.log("error while updating option1:", error);
				}
				else{
					console.log("update successful on option 1", result);
					response.json(result);
				}
			})
		}
		if(optionNum == 2){
			Poll.update({_id:pollId}, {$inc : {'option2.votes' : 1}}, function(error, result){
				if(error){
					console.log("error while updating option1:", error);
				}
				else{
					console.log("update successful on option 2", result);
					response.json(result);
				}
			})
		}
		if(optionNum == 3){
			Poll.update({_id:pollId}, {$inc : {'option3.votes' : 1}}, function(error, result){
				if(error){
					console.log("error while updating option1:", error);
				}
				else{
					console.log("update successful on option 3", result);
					response.json(result);
				}
			})
		}
		if(optionNum == 4){
			Poll.update({_id:pollId}, {$inc : {'option4.votes' : 1}}, function(error, result){
				if(error){
					console.log("error while updating option1:", error);
				}
				else{
					console.log("update successful on option 4", result);
					response.json(result);
				}
			})
		}
		// Poll.find({_id:pollId}, function(error, foundPoll){
		// 	if(error){
		// 		console.log("found error:", error);
		// 		response.json(error);
		// 	}
		// 	else{
		// 		console.log("found poll:", foundPoll);
		// 		if(optionNum == 1){
		// 			console.log("increased option1");
		// 			foundPoll.option1++;
		// 			foundPoll.save(function(error){
		// 				if(error){
		// 					console.log("found error increasing option1:", error);
		// 				}
		// 			})
		// 		}
		// 		if(optionNum == 2){
		// 			console.log("increased option2");
		// 			foundPoll.option2++;
		// 			foundPoll.save(function(error){
		// 				if(error){
		// 					console.log("found error increasing option2:", error);
		// 				}
		// 			})					
		// 		}
		// 		if(optionNum == 3){
		// 			console.log("increased option3");
		// 			foundPoll.option3++;
		// 			foundPoll.save(function(error){
		// 				if(error){
		// 					console.log("found error increasing option3:", error);
		// 				}
		// 			})
		// 		}
		// 		if(optionNum == 4){
		// 			console.log("increased option4");
		// 			foundPoll.option4++;
		// 			foundPoll.save(function(error){
		// 				if(error){
		// 					console.log("found error increasing option4:", error);
		// 				}
		// 			})
		// 		}
		// 	}
		// })
	}
}