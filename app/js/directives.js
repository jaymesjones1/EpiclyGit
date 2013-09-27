'use strict';


/* Directives */

app.directive("dial", function(){
	return{
		scope:{
			dial:"&"
		},
		template: '<input type="text" ng-model="value"><div class="button" ng-click="dial({message:value})">Call Home</div>'
	}
})




















/*app.directive("drink", function(){
	return{
		scope:{
			flavor:"@"
		},
		template: "<div>{{flavor}}</div>"
	}
})*/




















/*app.directive("kid", function(){
	return{
	restrict: "E",
	scope: {
		done:"&"
	},
	template: "<input type='text' ng-model='chore'><div>{{chore}}</div>" + "<div class='button' ng-click='done({chore:chore})'>I/'m Done</div>"
	}
})*/

/*app.directive("superhero",function(){
	return {
		restrict: "E",
		scope:{},
		
		controller:function ($scope){
			$scope.abilities = []
			
			this.addSize= function(){
				$scope.abilities.push("size")
			}
			
			this.addStrength= function(){
				$scope.abilities.push("strength")
			}
			
			this.addSpeed=function(){
				$scope.abilities.push("speed")
			}
		},
		
		link: function (scope, element) {
			element.addClass("button");
			element.bind("click", function (){
				console.log (scope.abilities);
			})
		}
	}
});

app.directive ("size", function(){
	return{
		require: "superhero",
		link: function(scope, element, attrs, superheroCtrl){
			superheroCtrl.addSize();
		}
	}
})

app.directive ("speed", function(){
	return{
	require: "superhero",
	link: function(scope, element, attrs, superheroCtrl){
		superheroCtrl.addSpeed();
	}
	}
})

app.directive ("strength", function(){
	return{
	require: "superhero",
	link: function(scope, element, attrs, superheroCtrl){
		superheroCtrl.addStrength();
	}
	}
})*/

/*app.directive("enter", function(){
	return function(scope, element, attrs){
		return element.bind("mouseenter", function(){
			scope.$apply(attrs.enter);
		})
	}
})

app.directive("leave", function(){
	return function(scope, element, attrs){
		return element.bind("mouseleave", function(){
			scope.$apply(attrs.leave);
		})
	}
})*/

/*app.directive("enter",function(){
	return function(scope, element, attrs){
		element.bind("mouseenter", function(){
			element.addClass(attrs.enter);
		})
	}
})

app.directive("leave",function(){
	return function(scope, element, attrs){
		element.bind("mouseleave", function(){
			element.removeClass(attrs.leave);
		})
	}
})*/


/*app.directive("superman", function(){
	return{
		restrict: "C",
		link: function(){
			alert("I'm Working!");
		}
	}
})*/