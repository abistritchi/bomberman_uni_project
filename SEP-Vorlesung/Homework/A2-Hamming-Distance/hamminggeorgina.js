//für diese Lösung haben bei mir alle Tests succeded

function calculateHammingDistance (str1,str2) {
    var n =0;
    for (var i = 0; i<str1.length; i++) {
        if (str1.charAt(i)===str2.charAt(i)) {
            n += 0;
        } else {
            n+=1;
        }
    }
    return n;
}