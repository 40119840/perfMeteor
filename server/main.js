import { Meteor } from 'meteor/meteor';



Meteor.startup(() => {


  //keep for mango db to work on client side

  Stocks = new Mongo.Collection('stocks');
  //Meteor.call(testwsdl);

  // code to run on server at startup
});
