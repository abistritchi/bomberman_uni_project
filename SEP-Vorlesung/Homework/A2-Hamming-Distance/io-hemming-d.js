function calculateHammingDistance(str1, str2){
	if (str1.length!==str2.length){
		return "String must be of same length"; // --Zahra Strings müssen nicht unbedingt die gleiche Länge haben!
		
		
		/** "The Hamming distance H is defined only for strings of the same length."
		    https://www.cut-the-knot.org/do_you_know/Strings.shtml
		    
		    
		    Andrei
		**/
		
		
	}else{ 
		let distance = 0;
		for (let i=0; i<str1.length; i++) {
			if (str1.charAt(i)!==str2.charAt(i)){
				distance +=1;
			}
		}
		return distance;
	}
}
