var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(bodyParser.json());


  var groupRouter = express.Router();
  var userRouter = express.Router();
  var shoutRouter = express.Router();

  //Use respective routers for all requests based on category
  app.use('/api/groups', groupRouter);
  app.use('/api/users', userRouter);
  app.use('/api/shouts', shoutRouter);

  //Inject routers into respective route files
  require('../routes/groups/groupRoutes.js')(groupRouter);
  require('../routes/users/userRoutes.js')(userRouter);
  require('../routes/shouts/shoutRoutes.js')(shoutRouter);
  app.use(express.static(__dirname + './../../client'));
}
