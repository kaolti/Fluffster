Tracker.autorun(function(){
  if(Meteor.userId()){
    Meteor.call("newUser", Meteor.userId());
  }
});








// Template.dashboard.helpers({
//   number: function(){
//     return runsQ.find().count();
//   }
// });
