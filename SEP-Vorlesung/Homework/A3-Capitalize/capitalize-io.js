function capitalize(str){
  var myList = str.split(" ");
  for(var i = 0; i < myList.length; i++){
  myList[i] = myList[i].charAt(0).toUpperCase() + myList[i].slice(1);
  }
  return myList.join(" ");
}

