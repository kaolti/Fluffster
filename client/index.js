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




  var myJobs = JobCollection('myJobQueue');
  customers = new Mongo.Collection('customers');

Meteor.subscribe('customer_info');

Meteor.subscribe('allJobs');


// checkSentiment = function(tweets, callback){
//
//   HTTP.post( 'http://sentiment.vivekn.com/api/batch/', {
//     data: tweets
//
//    }, function(error,response) {
//     if ( error ) {
//        console.log( error );
//        //future.return(err);
//      } else {
//        console.log(response.data);
//        callback(response.data);
//        //future.return(response.data);
//      }
//
//      //return future.wait();
//
//   });
//
//
// }



Template.dashboard.helpers({
  lastCompleted: function(){
    //return JSON.stringify(myJobs.find("message").fetch());

//var lastCompletedDate = myJobs.find({status: "completed"}, {sort: {updated: -1, limit: 1}}).fetch()[0].updated;

  if(myJobs.find({status: "completed"}, {sort: {updated: -1, limit: 1}}).fetch()[0]){
    lastCompletedDate = myJobs.find({status: "completed"}, {sort: {updated: -1, limit: 1}}).fetch()[0].updated
  } else {
    lastCompletedDate = new Date();
  }


// console.log(JSON.stringify(myJobs.find({status: "completed"},{limit: 1}).fetch()._id));
// console.log(myJobs.find({status: "completed"},{limit: 1}).fetch()._id);
//
// console.log(JSON.stringify(myJobs.find({status: "completed"},{limit: 1})._id));
// console.log(myJobs.find({status: "completed"},{limit: 1})._id);
//
// console.log(JSON.stringify(myJobs.find({status: "completed"},{limit: 1}).fetch()[0].updated));
// console.log(myJobs.find({status: "completed"},{limit: 1}).fetch()[0].updated;

//myJobs.find({message: "Job completed"})


    return lastCompletedDate;

  },
  lastFetch : function() {

    //var tweets = customers.find().fetch()[0].lastTweets;


    // THIS GRABS FIRST CUSTOMER - TO DO
    var tweets = customers.find().fetch()[0].lastTweets[0].tweet;

    return tweets;
  },

  lastScores: function() {

    // THIS GRABS FIRST CUSTOMER - TO DO
    var scores = JSON.stringify(customers.find().fetch()[0].lastTweets[0].score.result);

    if(!scores) {


        console.log("There's no scores. How?");
        //console.log(customers.find().fetch()[0].lastTweets.length);



    }

    return scores;

  },

  overallScore: function(){


    // instead of using the return value from calculateScore, we'll read the score from the collection.

    // Meteor.call('calculateScore', function(error, result){
    //   return result;
    // });

  }

});
