'use strict';

/* Controllers */

app.controller("phoneCtrl", function($scope){
	$scope.callHome=function(number){
		alert("called " + number);
	}
})





















/*app.controller("drinkCtrl", function($scope){

})*/

/*app.controller("ChoreCtrl", function($scope){
	$scope.logChore=function(chore){
		alert(chore + " is done");
	}
})/*

/*function AppCtrl($scope){
	$scope.loadMoreTweets = function(){
		console.log("Loading more tweets");
	}
	
	$scope.deleteTweets = function(){
		console.log("I'm deleting yo tweets!");
	}
}*/

/*function CategoriesCtrl($scope, Categories){
	$scope.categories = Categories;
}*/