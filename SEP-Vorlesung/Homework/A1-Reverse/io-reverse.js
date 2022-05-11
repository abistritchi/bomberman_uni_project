function reverse(str) {
  var a = [];                                               
  for (let i = 1; i <= str.length; i++) {
  //soweit ich weiß, geht das var i = 0, length = str.length; 
  //nicht in einer for-Schleife, schreib doch einfach (var i = 0; i < str.length; i++)  :-) - Georgina 
    a.push(str.charAt(str.length - i));
  }                          
  return a.join('');
}
