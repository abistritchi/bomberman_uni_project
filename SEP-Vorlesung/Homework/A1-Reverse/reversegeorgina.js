function reverse (string) {
    const x = [];
    let i = 0; //let i kannst du hier gleich in die for schleife reinpacken also (let i= string.length usw.) --Io 
    for (i = string.length; i<1; i--) { //die iterierungsbedingung (i<1)von der for schleife ist viel zu kurz, 
                                        //wenn du ein wort einer beliebigen länge eingibst kommt man nicht in die for schleife rein.--Io
        x.push(string.charAt(i));
    }
    return x; // da x constant ist wird in der console beim testen ein leeres array ausgegen >[] und kein string
}
//bei mir ist übrigens auch backstage abgeschmiert beim testen deines codes. 
//habe dann in der cosole einen string getestet und dann sind mir eben die oben kommentierten fehler aufgefallen.

/** 
 * hier ist mein Verbesserungsvorchlag :)
function reverse (string) {
    var x = [];
    for (let i = string.length; i>0; i--) {                                  
        x.push(string.charAt(i-1));
    }
    return x.join(''); // --Zahra  Das was du hier gemacht hast finde ich interresant, funktioniert bei mir aber irgendwie nicht:(
                                   Werde dich darüber in der Ü fragen:)
}

--Io
 */
 
/**
--Zahra
 * hier ist meine Lösung:

  function reverse(str) {
  let i = str.length,
      x = '';
  while (i > 0) {
    x = x + str.charAt(i-1);
    i--;
  }
  return x;
}

*/