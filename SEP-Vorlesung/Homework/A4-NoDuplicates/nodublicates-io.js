//all tests passing in backstage

function removeDuplicates(a){
    var newA = [];
    for (let i=0; i<a.length; i++){
    	if(newA.includes(a[i]) != 1){
    	newA.push(a[i]);
        }
    }
    return newA;
}
