var game = (function(){

var get1=1, get2=1;
var count=0;
var highestScore=localStorage.getItem('highscore_no');
var score = 0;
var record = [[0,0,0,0],	
			  [0,0,0,0],
			  [0,0,0,0],
		      [0,0,0,0]];

function getRandomInt(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};




var getRandomTwoOrFour=function(){

	var no = getRandomInt(0,15);
	if(no===1){
		return 4;
	}
	else{
		return 2;
	}
};

var mergeLeft = function(){
	count=0;
	for(var i=0;i<4;i++){
		var k=0;
		for(var j=0;j<4;){
			while(j<4 && record[i][j]===0){
				j++;	
			}
			k=j+1;
			while(k<4 && record[i][k]===0){
				k++;
			}
			if(j!=k){
				count++;
			}
			if(k<4 && j<4 && record[i][j]==record[i][k]){
				record[i][j]=2*record[i][j];
				record[i][k]=0;
			}
			j = k;
		}
	}

	for(var i=0;i<4;i++){
		k=0;
		for(var j=0;j<4;j++){
			if(record[i][j]!==0){
				record[i][k]=record[i][j];
				if(k!==j){
				record[i][j]=0;
				}k++;
			}
		}
	}
};

function clearBox(elementID)
{
    elementID.innerHTML = "";
}

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

function scoreUpdate(){
	var c=0;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			c = c + record[i][j];
		}
	}
	return c;
};

function highScoreUpdate(){
	if(highestScore<score){
		highestScore=score;
	}
	if (localStorage) {

    // Add an event listener for form submissions
    document.getElementById('contactForm').addEventListener('submit', function() {
      // Get the value of the name field.
      var name = document.getElementById('name').value;

      // Save the name in localStorage.
      localStorage.setItem('highscore_no', highestScore);
    });

  }
};

function printRecord(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			console.log(record[i][j]);
		}
	}

}

var addEffect = function(){

	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
				var div = (i*4)+(j+1);
				var el = document.getElementById("div"+div);
				clearBox(el);
			if(record[i][j]!==0){
				el.innerHTML=record[i][j];
			}
			el.classList.remove("two");
			el.classList.remove("empty");
			el.classList.remove("four");
			el.classList.remove("eight");
			el.classList.remove("sixteen");
			el.classList.remove("thirtyTwo");
			el.classList.remove("sixtyFour");
			if(record[i][j]===0){
				el.classList.add("empty");
			}
			else if(record[i][j]===2){
				el.classList.remove("empty");
				el.classList.add("two");
			}
			else if(record[i][j]===4){
				el.classList.remove("empty");
				el.classList.add("four");
			}
			else if(record[i][j]===8){
				el.classList.remove("empty");
				el.classList.add("eight");
			}
			else if(record[i][j]===16){
				el.classList.remove("empty");
				el.classList.add("sixteen");
			}
			else if(record[i][j]===32){
				el.classList.remove("empty");
				el.classList.add("thirtyTwo");
			}
			else if(record[i][j]===64){
				el.classList.remove("empty");
				el.classList.add("sixtyFour");
			}
		}
	}
	var el = document.getElementById("score_no");
	el.innerHTML=scoreUpdate();
};

var insertRandom = function(){
	console.log("DONE");

	var c = 0;
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(record[i][j]!==0){
				c++;
			}
		}
	}	
	
	if(c===16){
		window.alert("GAME OVER");
		var ans = window.confirm("Do you want to restart");
		if(ans===true){

		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				record[i][j]=0;
			}
		}	
		// highScoreUpdate();
		init();
		
			// return;
		}
		else{
			 var el = document.getElementsByTagName("body");
			 el.classList.add("glass");
			 highScoreUpdate();
			 return;
		}
	}
	else{
	var div = getRandomInt(1,17);
	j = (div-1)%4;
	i=Math.floor(div/4);	
	if(div%4===0){
		i=i-1;	
	}

	while(record[i][j]!==0){
		var rand = getRandomInt(1,17);
		j = (rand-1)%4;
		i=Math.floor(rand/4);	
		if(rand%4===0){
			i=i-1;	
		}
	}
	record[i][j]=getRandomTwoOrFour();	
	}
	addEffect();

}


function rotate(KeyCode){

	if(KeyCode===37){
		mergeLeft();
		printRecord();
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
	console.log("count value = " + count);
	if(count>0){
		insertRandom();
	}

};


var enterInitialData = function(){
	var divName1 = "div"+get1;
	var divName2 = "div"+get2;
	console.log("get1 get2 " + get1 + " " + get2);
	var el1 = document.getElementById(divName1);
	el1.innerHTML = 2;
	// el1.fontSize= "5px";
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