
if (Meteor.isServer) {

    

  Meteor.startup(function () {

    Future = Npm.require('fibers/future');







    return myJobs.startJobServer();

  });
}

//runsQ = new Mongo.Collection('runs');
