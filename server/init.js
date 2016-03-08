Meteor.startup(function () {



});


posts = new Mongo.Collection("posts");
Meteor.publish('theposts', function(){
    return posts.find();
});
