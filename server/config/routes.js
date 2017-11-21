var controller = require('../controllers/controller.js');

module.exports = function(app) {
	app.post('/users', function(request, response){
		controller.register(request, response);
	})

	app.get('/poll/:id', function(request, response){
		controller.findPoll(request, response);
	})

	app.get('/poll/:id/:number', function(request, response){
		controller.updatePoll(request, response);
	})

	app.get('/polls', function(request, response){
		controller.findPolls(request, response);
	})

	app.post('/polls', function(request, response){
		controller.createPoll(request, response);
	})

	app.get('/users/current', function(request, response){
		controller.getCurrentUser(request, response);
	})

	app.delete('/poll/:id', controller.deletePoll);
}