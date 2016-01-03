
var isLoggedIn = function(req) {
	return req.session ? !!req.session.user : false;
};

module.exports = {
	restrict: function(req, res, next) {
	console.log(req.session);
	  if (!isLoggedIn(req)) {
	    res.status(401).send("Unauthorized!");
	  } else {
	     next();
	  }
	},

	createSession: function(req, res, newUser) {
	  return req.session.regenerate(function() {
	      req.session.user = newUser;
          res.status(200).send('Success!');
	    });
	}

	persistGroup: function(req, res, group) {
		req.session.group = group;
		next();
	}
};

