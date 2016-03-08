if(Meteor.isClient){
  Accounts.onLogin(function(){
    FlowRouter.go('dashboard');
  });

  Accounts.onLogout(function(){
    FlowRouter.go('home');
  });
}


FlowRouter.triggers.enter([function(context,redirect){
  if(!Meteor.userId()){
    FlowRouter.go('home');
  }
}]);

FlowRouter.route( '/', {
  action: function() {

    if(Meteor.userId()){
      console.log("Logged in");
      FlowRouter.go('dashboard');
    }
    BlazeLayout.render( 'HomeLayout');
    console.log( "Homepage" );
  },
  name: 'home'
});

FlowRouter.route( '/dashboard', {
  action: function() {

    BlazeLayout.render( 'MainLayout', { main: 'dashboard' } );

    console.log( "Dashboard" );
  },
  name: 'dashboard'
});
