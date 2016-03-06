
Meteor.subscribe('test', function() {
  //console.log(test);
  console.log(runsQ.find().count());
});


Meteor.subscribe('theposts');

Template.dashboard.helpers({
  number: function(){
    return runsQ.find().count();
  }
});
