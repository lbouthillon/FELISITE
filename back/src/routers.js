const user = require('./routers/user.router');
const activity = require('./routers/activity.router');
const auth = require('./routers/auth.router');

module.exports = {
  user, activity, auth,
};
