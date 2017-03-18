console.log("sort.js active");


var RandomArray = [];


function quickSort(arr, left, right){
   var len = arr.length,
   pivot,
   partitionIndex;


  if(left < right){
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right);

   //sort left and right
   quickSort(arr, left, partitionIndex - 1);
   quickSort(arr, partitionIndex + 1, right);
  }
  return arr
}



function partition(arr, pivot, left, right){
var pivotValue = arr[pivot],
partitionIndex = left;

for(var i = left; i < right; i++){
if(arr[i] < pivotValue){
swap(arr, i, partitionIndex);
partitionIndex++;
}
}
swap(arr, right, partitionIndex);
return partitionIndex;
}


function swap(arr, i, j){
   var temp = arr[i];
   arr[i] = arr[j];
   arr[j] = temp;
}



function bubbleSort(arr){
   var len = arr.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(arr[j-1]>arr[j]){
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;
        }
     }
   }
return arr
}


function random() {
  var elem = document.getElementById('array');
  arrayL = elem.value;

  for (var a=[],i=0;i<arrayL;++i) a[i]=i;

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

    return array;
  }

  a = shuffle(a);

  return a;
}

Template.sortTemplate.events({
  'click #random'(event, instance) {
    start();
   var arr =  random();
   console.log("ddd",arr);
   var elem = document.getElementById('array');
   arrayL = elem.value-1;
   console.log("-11", arrayL)
   QSArr =  quickSort(arr,0,399);
   console.log(QSArr);
    stop();
  },


  'click #quickSort'(event, instance) {
    start();
    quickSort([11,8,14,3,6,2,7,10,12],0,8);
    stop();
  },

  'click #bubbleSort'(event) {
    start();
    bubbleSort([7,5,2,4,3,9]); //[2, 3, 4, 5, 7, 9]
    stop();
  },


});


Template.sortTemplate.helpers({

    'timer': function(){
      var time = Session.get('time');
      return time;
    },


});
