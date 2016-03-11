
if (Meteor.isServer) {

    myJobs = JobCollection('myJobQueue');
   myJobs.allow({
     // Grant full permission to any authenticated user
     admin: function (userId, method, params) {
       return (userId ? true : false);
     }
   });

  Meteor.startup(function () {

    Future = Npm.require('fibers/future');







    return myJobs.startJobServer();

  });
}

//runsQ = new Mongo.Collection('runs');
