
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
  } else {
    console.log("Existing user");
  }

}



function scheduleQuery(user){



  //Meteor.users.findOne(...).services.twitter



screenName = Meteor.users.findOne({ _id :user}).services.twitter.screenName;
accessToken = Meteor.users.findOne({ _id :user}).services.twitter.accessToken;
accessTokenSecret = Meteor.users.findOne({ _id :user}).services.twitter.accessTokenSecret;


console.log("ID: "+user+ " ,screenName: "+screenName+" ,accessToken: "+accessToken+" ,accessTokenSecret: "+accessTokenSecret);

  SyncedCron.add({
    name: 'Twitter Query',
    schedule: function(parser) {
      // parser is a later.parse object
      return parser.text('every 10 seconds');
    },
    job: function() {
      var addService = userSetup(screenName, accessToken, accessTokenSecret);
      return addService;
    }
  });



}





//cronHistory.find();

function userSetup(screenName, accessToken, accessTokenSecret){

  tweets = FetchData(screenName, accessToken, accessTokenSecret);
    //console.log(tweets);

  // Todo: Handle errors from FetchData



}


function FetchData(screenName, accessToken, accessTokenSecret) {


  var future = new Future();

  var T = new TwitMaker({
    consumer_key: 'sUacyvqiWidcOukAOrDdJ3b9K',
    consumer_secret: 'ZjfCp1Fja43ke29cieNc1cGcARBSj838asOlMwLtfhFAzjd56I',
    access_token: accessToken,
    access_token_secret: accessTokenSecret
  });



  T.get('search/tweets', { q: screenName, count: 100, result_type:"recent" }, function(err, data, response) {

    rateLimit = response.headers["x-rate-limit-remaining"];


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
