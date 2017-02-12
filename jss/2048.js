var twoZeroFourEight = (function(){

var get1;
var get2;
var key;
var max=0;
var record=[[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
			];

function getRandomInt(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function clearBox(elementID)
{
    elementID.innerHTML = "";
}

var mergeLeft = function(){
	var i, j=0, k;	
	var found=false;
	console.log("here");
	var count= 0;
	
	for(i=0;i<4;i++){
		j=0;
		while(j<4){
			while(j<4 && record[i][j]===0){
				j++;
			}
				k = j+1;
			while(k<4 && record[i][k]===0){
					k++;
			}
			
			if(j<4 && k<4 && (record[i][j]===record[i][k])){
					record[i][j]=2*record[i][j];
					record[i][k]=0;
			}	
			j=k+1;
		}
	}

	console.log("First" + record);

	k=0;
	for(i=0;i<4;i++){
		k=0;
		
		for(j=0;j<4;j++){
			// while(k<4 && record[i][k]!==0){
			// 	k++;
			// }
			console.log("WORKING");
			while(j<4 && record[i][j]===0){
				j++;
			}
			if(j<4 && record[i][j]!==0 && (j!==k)){

				record[i][k]=record[i][j];
				record[i][j]=0;
				k++;
			}
			console.log(j + "************* " + k);
		}
	}
};

function addEffect(){
	var i, j, k;
	for(i=0;i<4;i++){
		for(j=0;j<4;j++){
			var div = (i*4)+(j+1);
			var el = document.getElementById("div"+div);
			el.innerHTML=record[i][j];
			if(record[i][j]===0){
				el.classList.remove("two");
				el.classList.remove("four");
				el.classList.remove("eight");
				el.classList.remove("sixteen");
				el.classList.remove("thirtyTwo");
				el.classList.remove("sixtyFour");
				if(el)
				clearBox(el);
			}
			else if(record[i][j]===2){
				el.classList.add("two");
			}
			else if(record[i][j]===4){
				el.classList.add("four");
			}
			else if(record[i][j]===8){
				el.classList.add("eight");
			}
			else if(record[i][j]===16){
				el.classList.add("sixteen");
			}
			else if(record[i][j]===32){
				el.classList.add("thirtyTwo");
			}
			else if(record[i][j]===64){
				el.classList.add("sixtyFour");
			}
		}
	}
}


function getRandomInt(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// var rotateCounterClockwise = function(matrix){
// 	// reverse the individual rows
//   matrix = matrix.map(function(row) {
//     return row.reverse();
//   });
//   // swap the symmetric elements
//   for (var i = 0; i < matrix.length; i++) {
//     for (var j = 0; j < i; j++) {
//       var temp = matrix[i][j];
//       matrix[i][j] = matrix[j][i];
//       matrix[j][i] = temp;
//     }
//   }
// };

var rotateClockwise = function() {
  // reverse the rows
  record = record.reverse();
  // swap the symmetric elements
  for (var i = 0; i < record.length; i++) {
    for (var j = 0; j < i; j++) {
      var temp = record[i][j];
      record[i][j] = record[j][i];
      record[j][i] = temp;
    }
  }
};

var insertRandom = function(){
	console.log("DONE");
	var i=0, j=0;
	while(record[i][j]!==0){
		var rand = getRandomInt(1,17);
		j = (rand-1)%4;
		i=Math.floor(rand/4);	
		if(rand%4===0){
			i=i-1;	
		}
	}
	record[i][j]=randomNoTorF();	
}

var randomNoTorF = function(){

	if(getRandomInt(0,4)==0){
		return 4;
	}
	else{
		return 2;
	}
}

function rotate(KeyCode){

	if(KeyCode===37){
		mergeLeft();
		addEffect();
	}

	else if(KeyCode===38){	
		
		rotateClockwise();
		rotateClockwise();
		rotateClockwise();
		mergeLeft();
		rotateClockwise();
		addEffect();
	}

	else if(KeyCode===39){
		
		rotateClockwise();
		rotateClockwise();	
		mergeLeft();
		rotateClockwise();
		rotateClockwise();
		addEffect();
	}

	else if(KeyCode===40){
		rotateClockwise();
		mergeLeft();
		rotateClockwise();
		rotateClockwise();
		rotateClockwise();
		addEffect();
	}

	insertRandom();
};

var enterInitialData = function(){
	var divName1 = "div"+get1;
	var divName2 = "div"+get2;
	console.log("get1 get2 " + get1 + " " + get2);
	var el1 = document.getElementById(divName1);
	el1.innerHTML = 2;
	el1.fontSize= "5px";
	var i,j;
	j = (get1-1)%4;
	i=Math.floor(get1/4);	
	if(get1%4===0){
		i=i-1;	
	}
	console.log("i,j" + i + " " + j);
	record[i][j]=2;
	el1.classList.add("two");
	



	var el2 = document.getElementById(divName2);
	el2.innerHTML = 2;
	j = (get2-1)%4;
	i=Math.floor(get2/4);
	if(get2%4===0){
		i=i-1;	
	}
	console.log("i,j" + i + " " + j);
	record[i][j]=2;
	el2.classList.add("two");

	document.addEventListener("keydown", function(event) {
		key = event;
  	  	// console.log(event); 
  	  	// console.log(event);
		console.log(event);
	if(key && (key.which===37||key.which===38||key.which===39||key.which===40)){
		rotate(key.which);
	}
});
};



var init = function(){
	get1 = getRandomInt(1,17);
	get2 = getRandomInt(1,17);
	while(get1===get2){
		get2=getRandomInt(1,17);
	}
	console.log(get1, get2); 
	enterInitialData();
};


return{
	init:init,
};

})();