
if (Meteor.isServer) {



  Meteor.startup(function () {

    Future = Npm.require('fibers/future');

    Meteor.publish('allJobs', function () {
      return myJobs.find({});
    });

    Meteor.publish('customer_info',function(){
      return customers.find({_id: this.userId});
    });







    return myJobs.startJobServer();

  });
}

//runsQ = new Mongo.Collection('runs');
