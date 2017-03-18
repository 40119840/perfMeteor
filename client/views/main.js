import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"

Stocks = new Mongo.Collection('stocks');


function regexSearch() {
  var regex = /^testString/;
  var string = 'testStringAndThenSome';
  return (string.search(regex) === 0);
}

function sliceMatch() {
  var stringToStartWith = 'testString';
  var string = 'testStringAndThenSome';
  return (string.slice(0, stringToStartWith.length) === stringToStartWith);
}

function startsWith() {
  var stringToStartWith = 'testString';
  var string = 'testStringAndThenSome';
  return string.startsWith(stringToStartWith);
}

function iteration(func,it) {
  console.log("iterations",it);
  var times = it;

  if (func == "reg") {
    console.log("Regular expression")
    start();
    for (var i = 0; i < times; i++) {
      regexSearch();
    }
    stop();
  };

  if (func == "sliced") {
    console.log("Sliced match")
    start();
    for (var i = 0; i < times; i++) {
      regexSearch();
    }
    stop();
  };

  if (func == "start") {
    console.log("Starts With")
    start();
    for (var i = 0; i < times; i++) {
      startsWith();
    }
    stop();
  };
}




var startTime, time;

start = function (){
  startTime = Date.now();
  console.log("timer started");
}


stop  = function(){
  time = Date.now() - startTime
  console.log("time in ms:",time);
  Session.set('time', time);
}

// function updateDisplay(time){
//   var time2 = time
// console.log(time2)
// }




//using a service NOT ADDDD
Meteor.methods({
  'testwsdl' () {
   var url = 'http://www.webservicex.com/CurrencyConvertor.asmx?wsdl';
   var args = {
     FromCurrency: 'USD',
     ToCurrency: 'INR'
   };

   try {
     var client = Soap.createClient(url);
     var result = client.ConversionRate(args);
     console.log(result);
   } catch (err) {
     if (err.error === 'soap-creation') {
       console.log('SOAP Client creation failed');
     } else if (err.error === 'soap-method') {
       console.log('SOAP Method call failed');
     }

   }
   return result;
 }
});





Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },

  'stock': function(){
    start();
    M = Stocks.find({ "Performance (Week)": {$gt: 0.1}  })
    stop();
    return M
  },

  'timer': function(){
    var time = Session.get('time');
    return time;
  },


});

Template.hello.events({

  'click #startQuery'(event) {
    start();
    M = Stocks.find({ "Performance (Week)": {$gt: 0.1}  })
    stop();
    // increment the counter when button is clicked

  },


  'click #button'(event, instance) {
    console.log('WSDL time: result server side')
    start();
    Meteor.call('testwsdl');
    stop();
  },

  'click #regex'(event) {

    //var t0 = new Date().getTime();
    var elem = document.getElementById('iter');
    iter = elem.value;
    iteration("reg",iter)

    //var t1 = new Date().getTime();
    //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
  },

  'click #sliced'(event) {
    var elem = document.getElementById('iter');
    iter = elem.value;
    iteration("sliced",iter)
  },

  'click #startsWith'(event) {
    var elem = document.getElementById('iter');
    iter = elem.value;
    iteration("start",iter)
  },

  'click #webpage'(event) {
    $(function(){
      var contentURI= 'http://google.com #header';    // URL TO GRAB + # of any desired element // if needed :)
      $('#response').load('grabber.php?url='+ contentURI);
    });
  },




  'click #timer'(event) {
    start();
  },


  'click #toff'(event) {
    stop();
  },


});
