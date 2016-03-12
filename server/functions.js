


Meteor.methods({
  newUser: function (user) {
    checkCustomer(user);
  }
})


// Schedule Twitter search for user

function checkCustomer(userId){

  console.log("Checking customer with id: "+userId);

  screenName = Meteor.users.findOne({ _id :userId}).services.twitter.screenName;
  accessToken = Meteor.users.findOne({ _id :userId}).services.twitter.accessToken;
  accessTokenSecret = Meteor.users.findOne({ _id :userId}).services.twitter.accessTokenSecret;

  //console.log(customers.find({ _id: userId }))

  if(!customers.findOne({screenName: screenName })){
    console.log("NEW USER");
    customers.insert({

      _id:userId,
      createdAt: new Date(),
      screenName: screenName

    });


    scheduleQuery(userId);


  } else {
    console.log("Existing user");
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

// check if cron is scheduled for this user -- TO ADD

//userSetup(screenName, accessToken, accessTokenSecret

// New cron

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
      .delay(5*1000)     // Wait an hour before first try
      .save();               // Commit it to the server



}





//cronHistory.find();

userSetup = function(screenName, accessToken, accessTokenSecret){

  tweets = FetchData(screenName, accessToken, accessTokenSecret);
    //console.log(tweets);

  // Todo: Handle errors from FetchData
  //console.log(tweets);
  var results = [];

          for (var i = 0; i < tweets.statuses.length; i++) {
            //console.log("first for");
            //results[i] = "<span>"+response.data.result+"</span><span> Score: </span>"+response.data.confidence+responseone.statuses[i].text;
            results[i] = tweets.statuses[i].text;

          }


  console.log(results);
  return results;



}


function FetchData(screenName, accessToken, accessTokenSecret) {


  var future = new Future();

  var T = new TwitMaker({
    consumer_key: 'sUacyvqiWidcOukAOrDdJ3b9K',
    consumer_secret: 'ZjfCp1Fja43ke29cieNc1cGcARBSj838asOlMwLtfhFAzjd56I',
    access_token: accessToken,
    access_token_secret: accessTokenSecret
  });



  T.get('search/tweets', { q: screenName, count: 10, result_type:"recent" }, function(err, data, response) {

    rateLimit = response.headers["x-rate-limit-remaining"];
    console.log("rateLimit: "+rateLimit);

    if(err){
        future.return(err);
      } else {
        // console.log("Data length:");
        // console.log(data.statuses.length);
        future.return(data);

      }


  });


  console.log("executed");

  return future.wait();


}



//console.log(history.find());
