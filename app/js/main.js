var app = angular.module ("epicApp",['ui.bootstrap', 'CornerCouch'])

String.prototype.replaceAt=function(index, character) {
      return this.substr(0, index) + character + this.substr(index+character.length);
   }


  
app.controller("TypeaheadCtrl", function ($scope, $http, $location, $log, $timeout) {

  $scope.selected = undefined;
  $http.get('data/epics.json').success(function(data) {
		$scope.epics = data;
	})
	
	$scope.onSelect = function($item, $model, $label){
		$scope.$item = $item;
		$scope.$model = $model;
		$scope.$label = $label;
		$log.info($scope.$item);
		$log.info($scope.$model);
		$log.info($scope.$label);
		$location.path('/epics/' + $scope.$item.category + '/' + $scope.$item.url);
	  }
})
  

app.controller("LoginCtrl",function($scope, cornercouch){
	$scope.server = cornercouch("http://127.0.0.1:5984/&callback");
	$scope.submitLogin = function() {
    $scope.server.login($scope.loginUser, $scope.loginPass)
        .success( function() {
            $scope.loginPass = $scope.loginUser = '';
            $scope.showInfo = true;
            $scope.server.getInfo();
            $scope.server.getDatabases();
            $scope.server.getUUIDs(3);
            $scope.server.getUserDoc();
            $scope.gbookdb.getInfo();
        });
	};
})

app.controller("EpicCtrl", function($scope, $http){


		$http.get('data/epics.json').success(function(data) {
		$scope.epics = data;
		$scope.order = '-points';
		$scope.setOrder = function (order) {
			$scope.order = order;
		};
		
		if($scope.epic.difficulty === 100){
			$scope.difficultyClass = "one-hundred";
		}
		else {
			$scope.difficultyClass = toWords($scope.epic.difficulty);
		}
	})
})

/*app.filter("filterEpics", function(){
	return function(epics, options){
		alert(options);
	}
})*/

app.directive('prevent', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
})



function EpicDetailCtrl($scope, $routeParams, $http) {
  $http.get('data/epics/' + $routeParams.epicUrl + '.json').success(function(data) {
    $scope.epic = data;
	$scope.Math= window.Math;
	$scope.numSuccess = $scope.epic.numSuccess;
	$scope.numFailed = $scope.epic.numFailed;
	$scope.successRate=Math.round(100*($scope.numSuccess/($scope.numSuccess+$scope.numFailed)));
	$scope.statsVisible = false;
	$scope.toggleStats = function(){
		$scope.statsVisible = !$scope.statsVisible;
	}
  });
}

app.config(function($routeProvider){
	$routeProvider.when('/',
		{
			templateUrl: "partials/home.html"
		})
	.when('/login/',
		{
			templateUrl: "partials/login.html"
		})
	.when('/epics/',
		{
			templateUrl: "partials/epics.html"
		})
	.when('/epics/random/',
		{
			templateUrl: "partials/random.html"
		})
	.when('/epics/comedy/',
		{
			templateUrl: "partials/comedy.html"
		})
	.when('/epics/health-and-fitness/',
		{
			templateUrl: "partials/health-and-fitness.html"
		})
	.when('/epics/outdoors/',
		{
			templateUrl: "partials/outdoors.html"
		})
	.when('/epics/travel/',
		{
			templateUrl: "partials/travel.html"
		})
	.when('/epics/sports/',
		{
			templateUrl: "partials/sports.html"
		})
	.when('/epics/business/',
		{
			templateUrl: "partials/business.html"
		})
	.when('/epics/random/:epicUrl',
		{
			templateUrl: "partials/epic-details.html",
			controller: EpicDetailCtrl
		})
	.when('/epics/comedy/:epicUrl',
		{
			templateUrl: "partials/epic-details.html",
			controller: EpicDetailCtrl
		})
	.when('/epics/health-and-fitness/:epicUrl',
		{
			templateUrl: "partials/epic-details.html",
			controller: EpicDetailCtrl
		})
	.when('/epics/outdoors/:epicUrl',
		{
			templateUrl: "partials/epic-details.html",
			controller: EpicDetailCtrl
		})
	.when('/epics/travel/:epicUrl',
		{
			templateUrl: "partials/epic-details.html",
			controller: EpicDetailCtrl
		})
	.when('/epics/sports/:epicUrl',
		{
			templateUrl: "partials/epic-details.html",
			controller: EpicDetailCtrl
		})
	.when('/epics/business/:epicUrl',
		{
			templateUrl: "partials/epic-details.html",
			controller: EpicDetailCtrl
		})
	.otherwise(
		{
			redirectTo: '/'
		});
})

/*app.directive("iconswithback", function(){
	return{
		restrict:"E",
		transclude:true,
		controller:  function($scope, $http, $location){
						$http.get('data/notifications.json').success(function(data) {
							$scope.notifications = data;
						})
					},
		scope: {
			title: "@"
		},
		template: 
			'<a href="#/epics"><i class="icon-arrow-left hamburger" ng-transclude></i></a>'+
			'<span class="title">{{title}}</span>' +
			'<i class="icon-globe right" ng-click="toggleNotifications()"></i>'+
			'<i class="icon-trophy right" ng-click="toggleMyEpics()"></i>'+ 
					'<div ng-show="navVisible" class="navMenu">'+
						'<ul>'+
							'<li class="userInfo"> Username </li>'+
							'<li><a href="#"> Epics Feed </a></li>'+
							'<li><a href="#"> My Epics </a></li>'+
							'<li><a href="#"> Browse Epics </a></li>'+
							'<li><a href="#"> New Epic </a></li>'+
							'<li><a href="#"> My Profile </a></li>'+
							'<li><a href="#"> People </a></li>'+
							'<li><a href="#"> Account Settings </a></li>'+
							'<li><a href="#"> Logout </a></li>'+
						'</ul>'+
					'</div>'+
					'<div ng-show="notificationsVisible" class="notifications">' +
						'<ul>'+
							'<li ng-repeat="notification in notifications"> {{notification.message}} <li>' + 
						'</ul>' +
					'</div>'+
					'<div ng-show="myEpicsVisible" class="myEpics">' + 
						'<ul>'+
							'<li>epic 1<li>' + 
							'<li>epic 2<li>' +
							'<li>epic 3<li>' +
							'<li>epic 4<li>' +
							'<li>epic 5<li>' +
						'</ul>'+
					'</div>'
					,
		link:function(scope, element, attrs){
			scope.notificationsVisible=false;
			scope.myEpicsVisible = false;
			
			scope.toggleNotifications = function(){
				scope.myEpicsVisible = false;
				scope.notificationsVisible = !scope.notificationsVisible;
			}
			
			scope.toggleMyEpics = function(){
				scope.notificationsVisible = false;
				scope.myEpicsVisible = !scope.myEpicsVisible;
			}
		}
	}
})
*/

app.directive("iconswithback", function(){
	return{
		restrict:"E",
		transclude:true,
		controller:  function($scope, $http, $location){
						$http.get('data/notifications.json').success(function(data) {
							$scope.notifications = data;
						})
						$scope.currLocation = $location.url();
						$scope.pages = $scope.currLocation.split('/');
						$scope.pageTitle = $scope.pages[2];
						$scope.finalTitle = "";
						$scope.pageWords = $scope.pageTitle.split('-');
						for (var i = 0; i < $scope.pageWords.length; i++){
							var word = $scope.pageWords[i];
							var firstLetter = word.charAt(0);
							firstLetter = firstLetter.toUpperCase();
							var finalWord = word.replaceAt(0, firstLetter);
							
							if (i < $scope.pageWords.length-1){
							$scope.finalTitle = $scope.finalTitle.concat(finalWord + " ");
							} else {
								$scope.finalTitle = $scope.finalTitle.concat(finalWord);
							}
							
						}
						$scope.prevLocation = "#/" + $scope.pages[1] + "/" + $scope.pages[2];
						
						
					},
		scope: {
			title: "@"
		},
		template: 
			'<a href="#" ng-click="goBack()" prevent><i class="icon-arrow-left hamburger" ng-transclude></i></a>'+
			'<span class="title">{{finalTitle}}</span>' +
			'<i class="icon-globe right" ng-click="toggleNotifications()"></i>'+
			'<i class="icon-trophy right" ng-click="toggleMyEpics()"></i>'+ 
					'<div ng-show="navVisible" class="navMenu">'+
						'<ul>'+
							'<li class="userInfo"> Username </li>'+
							'<li><a href="#"> Epics Feed </a></li>'+
							'<li><a href="#"> My Epics </a></li>'+
							'<li><a href="#"> Browse Epics </a></li>'+
							'<li><a href="#"> New Epic </a></li>'+
							'<li><a href="#"> My Profile </a></li>'+
							'<li><a href="#"> People </a></li>'+
							'<li><a href="#"> Account Settings </a></li>'+
							'<li><a href="#"> Logout </a></li>'+
						'</ul>'+
					'</div>'+
					'<div ng-show="notificationsVisible" class="notifications">' +
						'<ul>'+
							'<li ng-repeat="notification in notifications"> {{notification.message}} <li>' + 
						'</ul>' +
					'</div>'+
					'<div ng-show="myEpicsVisible" class="myEpics">' + 
						'<ul>'+
							'<li>epic 1<li>' + 
							'<li>epic 2<li>' +
							'<li>epic 3<li>' +
							'<li>epic 4<li>' +
							'<li>epic 5<li>' +
						'</ul>'+
					'</div>'
					,
		link:function(scope, element, attrs){
			scope.notificationsVisible=false;
			scope.myEpicsVisible = false;
			
			scope.toggleNotifications = function(){
				scope.myEpicsVisible = false;
				scope.notificationsVisible = !scope.notificationsVisible;
			}
			
			scope.toggleMyEpics = function(){
				scope.notificationsVisible = false;
				scope.myEpicsVisible = !scope.myEpicsVisible;
			}
			
			scope.goBack = function(){
				window.history.back();
			}
		}
	}
})

app.directive("icons", function(){
	return{
		restrict:"E",
		scope: {
			title: "@"
		},
		transclude:true,
		controller:  function($scope, $http){
						$http.get('data/notifications.json').success(function(data) {
							$scope.notifications = data;
							console.log($scope.notifications);
						})
					},
		template: 
			'<i class="icon-reorder hamburger" ng-click="toggleNav()" ng-transclude></i>'+
			'<span class="title">{{title}}</span>' +
			'<i class="icon-globe right" ng-click="toggleNotifications()"></i>'+
			'<i class="icon-trophy right" ng-click="toggleMyEpics()"></i>'+ 
					'<div ng-show="navVisible" class="navMenu">'+
						'<ul>'+
							'<li class="userInfo"><img src="http://31.media.tumblr.com/tumblr_md5rnqvUHH1qlrx3zo1_500.jpg">Username </li>'+
							'<li><a href="#"> Epics Feed </a></li>'+
							'<li><a href="#"> My Epics </a></li>'+
							'<li><a href="#"> Browse Epics </a></li>'+
							'<li><a href="#"> New Epic </a></li>'+
							'<li><a href="#"> People </a></li>'+
							'<li><a href="#"> My Profile </a></li>'+
							'<li><a href="#"> Account Settings </a></li>'+
							'<li><a href="#"> Logout </a></li>'+
						'</ul>'+
					'</div>'+
					'<div ng-show="notificationsVisible" class="notifications">' +
						'<ul>'+
							'<li ng-repeat="notification in notifications"> {{notification.message}} <li>' + 
						'</ul>' +
					'</div>'+
					'<div ng-show="myEpicsVisible" class="myEpics">' + 
						'<ul>'+
							'<li>epic 1<li>' + 
							'<li>epic 2<li>' +
							'<li>epic 3<li>' +
							'<li>epic 4<li>' +
							'<li>epic 5<li>' +
						'</ul>'+
					'</div>'
					,
		link:function(scope, element){
			scope.notificationsVisible=false;
			scope.myEpicsVisible = false;
			scope.navVisible = false;
			
			scope.toggleNotifications = function(){
				scope.myEpicsVisible = false;
				scope.navVisible=false;
				scope.notificationsVisible = !scope.notificationsVisible;
			}
			
			scope.toggleMyEpics = function(){
				scope.notificationsVisible = false;
				scope.navVisible=false;
				scope.myEpicsVisible = !scope.myEpicsVisible;
			}
			
			scope.toggleNav = function(){
				scope.notificationsVisible = false;
				scope.myEpicsVisible = false;
				scope.navVisible = !scope.navVisible;
			}
		}
	}
})



app.directive("myheader", function(){
	return {
		restrict:"E",
		transclude:true,
		scope:{},
		template: '<div ng-transclude></div>',
	}
})

$(".refine").click(function(){
	$("#sortMask").css("display", "block");
});


// Convert numbers to words
// copyright 25th July 2006, by Stephen Chapman http://javascript.about.com
// permission to use this Javascript on your web page is granted
// provided that all of the code (including this copyright notice) is
// used exactly as shown (you can change the numbering system if you wish)

// American Numbering System
var th = ['','thousand','million', 'billion','trillion'];
// uncomment this line for English Number System
// var th = ['','thousand','million', 'milliard','billion'];

var dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine']; var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen']; var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety']; function toWords(s){s = s.toString(); s = s.replace(/[\, ]/g,''); if (s != parseFloat(s)) return 'not a number'; var x = s.indexOf('.'); if (x == -1) x = s.length; if (x > 15) return 'too big'; var n = s.split(''); var str = ''; var sk = 0; for (var i=0; i < x; i++) {if ((x-i)%3==2) {if (n[i] == '1') {str += tn[Number(n[i+1])] + ' '; i++; sk=1;} else if (n[i]!=0) {str += tw[n[i]-2] + '-';sk=1;}} else if (n[i]!=0) {str += dg[n[i]] +' '; if ((x-i)%3==0) str += 'hundred ';sk=1;} if ((x-i)%3==1) {if (sk) str += th[(x-i-1)/3] + ' ';sk=0;}} if (x != s.length) {var y = s.length; str += 'point '; for (var i=x+1; i<y; i++) str += dg[n[i]] +' ';} return str.replace(/\s+/g,' ');}



/*for (var i = 61; i<101; i++){
	var iWord =toWords(i);
	console.log("." + iWord + "{background-color:#f7a397;.inner{width:" + i + "%;background-color:$darkSalmon;}}");
}*/