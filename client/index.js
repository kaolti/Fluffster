Accounts.onLogin(function(user){
  //console.log("REAL FUCKING LOGIN");
  Meteor.call("newUser", Meteor.userId());
  console.log("User logged in with Id: "+Meteor.userId());
});


// Tracker.autorun(function(){
//   if(Meteor.userId()){
//     //console.log("Check userid");
//
//   }
//
//
//
//
//   if(Meteor.loggingIn() && Meteor.userId()){
//
//
//   }
//
//
//
// });








// Template.dashboard.helpers({
//   number: function(){
//     return runsQ.find().count();
//   }
// });
