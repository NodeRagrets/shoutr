var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '../../../client'));

  var groupRouter = express.Router();
  var userRouter = express.Router();
  var shoutRouter = express.Router();

  require('../routes/groups/groupRoutes.js')(groupRouter);
  require('../routes/users/userRoutes.js')(userRouter);
  require('../routes/shouts/shoutRoutes.js')(shoutRouter);
}
