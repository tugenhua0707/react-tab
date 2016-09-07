
var fs = require('fs');
var myData = [  
	{"name":"book1","category":"1","quantity":"27","allowlend":"1"},  
	{"name":"book2","category":"2","quantity":"27","allowlend":"1"},  
	{"name":"book3","category":"3","quantity":"27","allowlend":"1"},  
	{"name":"book4","category":"4","quantity":"27","allowlend":"1"},  
	{"name":"book5","category":"5","quantity":"27","allowlend":"1"}  
];
var outputFilename = './json/index.json'; 
fs.writeFile(outputFilename,JSON.stringify(myData,null,4),function(err){
  if(err) {
  	console.log(err);
  }else {
  	console.log("JSON saved to" + outputFilename);
  }
});