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

        userSetup(jobData.screenName, jobData.accessToken, jobData.accessTokenSecret);


          cb();

      }
    );
