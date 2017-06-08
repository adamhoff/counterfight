import { Meteor } from 'meteor/meteor';

import Items from '../imports/api/Items';
import '../imports/server/Accounts';

Meteor.publish('currentUser', function() {
  return Meteor.users.find({_id: this.userId}, {
    fields: {
      roles: 1
    }
  });
});

Meteor.startup(() => {

  // code to run on server at startup
});
