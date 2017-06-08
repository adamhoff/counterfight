Accounts.onCreateUser((options, user) => {
  if (Meteor.settings.admins.indexOf() > -1 ) {
    user.roles = ['admin'];
  }
  return user;
})
