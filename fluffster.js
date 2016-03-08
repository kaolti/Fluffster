if (Meteor.isServer) {
  Meteor.startup(function () {

    Future = Npm.require('fibers/future');

  });
}

//runsQ = new Mongo.Collection('runs');
