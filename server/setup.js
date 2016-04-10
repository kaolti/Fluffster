//ccHistory = new Mongo.Collection('ccHistory');

customers = new Mongo.Collection('customers');


///////////////////
// node.js Worker to fetch Twitter data

//var Job = require('meteor-job');

// `Job` here has essentially the same API as JobCollection on Meteor.
// In fact, job-collection is built on top of the 'meteor-job' npm package!


// Open the DDP connection


  // Call below will prompt for email/password if an
  // authToken isn't available in the process environment


    // We're in!
    // Create a worker to get sendMail jobs from 'myJobQueue'
    // This will keep running indefinitely, obtaining new work
    // from the server whenever it is available.
    // Note: If this worker was running within the Meteor environment,
    // Then only the call below is necessary to setup a worker!
    // However in that case processJobs is a method on the JobCollection
    // object, and not Job.


    myJobs = JobCollection('myJobQueue');
     myJobs.allow({
       // Grant full permission to any authenticated user
       admin: function (userId, method, params) {
         return (userId ? true : false);
       }
     });


    var workers = myJobs.processJobs('jobName',
      function (job, cb) {
        // This will only be called if a
        // 'sendEmail' job is obtained

        var jobData = job.data;

        userSetup(jobData.screenName, jobData.accessToken, jobData.accessTokenSecret,function(data) {

          console.log("checking if there's data");

            if(data){

              // handle data received

              console.log("there is data, updating customer data");



              Meteor.call('checkSentiment', customers.find().fetch()[0].lastTweets, customers.find().fetch()[0].screenName, function(error, result){

                if(error){
                  console.log("Error checking sentiment");

                } else {


                  console.log("WE GOT A RESULT BITCH! Well what is it?");
                  console.log(result);

                  // Adding tweets and scores to collection

                  for (var i = 0; i<= result.length; i++){

                    customers.update({screenName: jobData.screenName},
                      {
                        $push: {lastTweets: {tweet:data[i], score:result[i]}}
                      });

                    }


                }


              });












              console.log(data);

              job.done();
            } else {
              job.log("Job failed",
                {level: 'warning'});
            }
            // Be sure to invoke the callback
            // when work on this job has finished
            cb();
          });




      }
    );
