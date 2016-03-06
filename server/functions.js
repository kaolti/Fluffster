SyncedCron.add({
  name: 'Crunch some important numbers for the marketing department',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.text('every 10 seconds');
  },
  job: function() {
    var numbersCrunched = FetchData();
    return numbersCrunched;
  }
});

//cronHistory.find();










Meteor.publish("test", function () {
    return runsQ.find();
  });






function FetchData() {
  runsQ.insert( {Name: "jay"} );
  console.log("executed: "+runsQ.find().count());
}



//console.log(history.find());
