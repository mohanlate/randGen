/*
@name : Number generator
@version: 1.0
@author : Mohan Late <mohan.late@gmail.com>
@description: This version successfully gets random numbers generated from server, then sorts and sums up all the numbers
*/

(function() {
	"use strict";

	var rp = require('request-promise');

	var serverUrl =  'https://my.quietyme.com/numbertest.php?number=';

	var numberItems = 5;
	var arrNumbers = [];
	var sum = 0;

	/*
	* @function randNo.
	* @description This function generates a 2 digit random number between 10 and 99.
	* @param none.
	* @returns {Integer} a random integer value between 10 and 99.
	* @author Mohan Late <mohan.late@gmail.com>
	*/
	var randomNo = function () {
		var min = 10,
		max = 99;
	    return Math.floor(Math.random() * (max - min) + min);
		};


	/*
	* @function generateNumber.
	* @description This function adds a randomly generated number to the queryString and queries the serverurl.
	* @param {loopCount} Integer: This parameter is used to track the number of times it is recursively calling itself till it becomes 0.
	* @param {sum} Integer: This parameter is used to track the sum total of all the generated numbers.
	* @returns none
	* @author Mohan Late <mohan.late@gmail.com>
	*/
	var generateNumber = function(loopCount,sum){
		//query URL
		rp({ 
			uri: serverUrl + randomNo(), resolveWithFullResponse: true 
		})
		.then(
			function(response){
				//get the response 
				var num = response.body;
				console.log("Generated number: " + num);
				//store the response in array
				arrNumbers.push(num); 
				//add up the total (sum) 
				sum = sum + parseInt(num);
		})
		.finally(
			function(){
				if(loopCount){
					generateNumber(--loopCount, sum);
				} else {
					//display the original array of numbers
					console.log("Done. And the original array is : " + arrNumbers);
					//sort the array and display it
					console.log("The sorted array is : " + arrNumbers.sort()); 
					//display the sum of all the numbers in the array
					console.log("The total of the numbers in the array is: total =: " + sum);
				}
			});	
	}
	generateNumber(numberItems,sum);

}).call(this);	
