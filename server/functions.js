


Meteor.methods({
  newUser: function (user) {
    // check if user is customer
    checkCustomer(user);
  }
})


// function checks if userID is in customers collection

function checkCustomer(userId){

  console.log("Checking customer with id: "+userId);

  screenName = Meteor.users.findOne({ _id :userId}).services.twitter.screenName;
  accessToken = Meteor.users.findOne({ _id :userId}).services.twitter.accessToken;
  accessTokenSecret = Meteor.users.findOne({ _id :userId}).services.twitter.accessTokenSecret;



  if(!customers.findOne({screenName: screenName })){

    console.log("Logged in user not a customer");
    console.log("Adding to customers collection");
    customers.insert({

      _id:userId,
      createdAt: new Date(),
      screenName: screenName,
      lastTweets: []

    });


    scheduleQuery(userId);


  } else {
    console.log("Logged in user is already a customer");
    scheduleQuery(userId);
  }

}



function scheduleQuery(userId){



  //Meteor.users.findOne(...).services.twitter



screenName = Meteor.users.findOne({ _id :userId}).services.twitter.screenName;
accessToken = Meteor.users.findOne({ _id :userId}).services.twitter.accessToken;
accessTokenSecret = Meteor.users.findOne({ _id :userId}).services.twitter.accessTokenSecret;


console.log("ID: "+userId+ " ,screenName: "+screenName+" ,accessToken: "+accessToken+" ,accessTokenSecret: "+accessTokenSecret);

//console.log("Cron history: "+JSON.stringify(SyncedCron._collection.findOne({ name :screenName})));


  // check if cron is scheduled for this user

  if(myJobs.findOne({
    "data.screenName":screenName
  })){
    console.log("A job is already set up");
  } else {
    console.log("Setting up new job");


    // Create a job:
        var job = new Job(myJobs, 'jobName', // type of job
          // Job data that you define, including anything the job
          // needs to complete. May contain links to files, etc...
          {
            screenName: screenName,
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret
          }
        );

        // Set some properties of the job and then submit it
        job.priority('normal')
          .retry({ retries: 5,
            wait: 15*60*1000 })  // 15 minutes between attempts
          .delay(1000)
          .repeat({
            schedule: myJobs.later.parse.cron('15 10 ? * *')   // Run every day at 10:15 AM
          })
          .after(new Date())
          .save();               // Commit it to the server



          // Fetch data manually

          fetchManually(screenName, accessToken, accessTokenSecret, function(status){

            if(status){
            console.log("Data fetched");
            }

          });


  }




}



fetchManually = function (screenName, accessToken, accessTokenSecret, callback){


  userSetup(screenName, accessToken, accessTokenSecret,function(data) {

    console.log("checking if there's data");

      if(data){

        // handle data received

        console.log("there is data, updating customer data");



        Meteor.call('checkSentiment', data, screenName, function(error, result){

          if(error){
            console.log("Error checking sentiment");

          } else {


            console.log("WE GOT A RESULT BITCH! Well what is it?");
            console.log(result);

            // Adding tweets and scores to collection

            // customers.update({screenName: screenName},
            //   {
            //     $push: {"lastTweets": [{"tweet":data[1], "score":result[1]}]}
            //   });

            for (var i = 0; i< result.length; i++){

              customers.update({screenName: screenName},
                {
                  $push: {lastTweets: {tweet:data[i], score:result[i]}}
                });

              }


          }


        });


        return true;
        console.log(data);


      } else {

        return false;
        console.log("no data");

      }
      // Be sure to invoke the callback
      // when work on this job has finished

    });


}



//cronHistory.find();


Meteor.methods({


    'checkSentiment': function(tweets,screenName){

      // Sync http.post call - no need for future or wrapasync

      return HTTP.post( 'http://sentiment.vivekn.com/api/batch/', {
        data: tweets
      }).data;

    },

    'calculateScore': function(){

      // TO DO
      // Calculate average score based on data in lastTweets
      // average score will be saved in collection under customer.scores - scores value will store value, score.date to store date of saving


    }




});







userSetup = function(screenName, accessToken, accessTokenSecret, callback){

  tweets = FetchData(screenName, accessToken, accessTokenSecret);
    //console.log(tweets);

  // Todo: Handle errors from FetchData

  console.log("Tweets returned: ");
  //console.log(tweets);

  var results = [];

          for (var i = 0; i < tweets.statuses.length; i++) {
            //console.log("first for");
            //results[i] = "<span>"+response.data.result+"</span><span> Score: </span>"+response.data.confidence+responseone.statuses[i].text;
            results[i] = tweets.statuses[i].text;

          }


  //console.log(results);
  callback(results);



}


var FetchData = function(screenName, accessToken, accessTokenSecret) {

  console.log("fetch data now!")

  var future = new Future();

  var T = new TwitMaker({
    consumer_key: 'sUacyvqiWidcOukAOrDdJ3b9K',
    consumer_secret: 'ZjfCp1Fja43ke29cieNc1cGcARBSj838asOlMwLtfhFAzjd56I',
    access_token: accessToken,
    access_token_secret: accessTokenSecret
  });



  T.get('search/tweets', { q: screenName+" -filter:retweets", count: 100, result_type:"recent" }, function(err, data, response) {

    rateLimit = response.headers["x-rate-limit-remaining"];
    console.log("rateLimit: "+rateLimit);

    if(err){
        future.return(err);
        console.log("Error:");
        console.log(err);
      } else {
        console.log("Data length:");
        console.log(data.statuses.length);
        future.return(data);

      }


  });


  console.log("executed");

  return future.wait();


}



//console.log(history.find());
