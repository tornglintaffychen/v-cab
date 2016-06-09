Style Guide
----
Functions
-----
* Name consistently and explicitly

Angular
---
* Capital camel case

	- Controllers = "Component + Ctrl"
	>		e.g. ProductCtrl, OrderCtrl

	- Factories = "Component + Factory"
	>	 e.g. ProductFactory

	Quick copy factory method to use:
	(change components)
	```js
	app.factory('ComponentFactory', function ($http) {
	    var ComponentFactory = {};

			//we should make a utilfor this
	    function getData(res) {
	        return res.data;
	    }
	    ComponentFactory.fetchAll = function () {
	        return $http.get('/api/components/...')
	            .then(getData)
	    };
	    ComponentFactory.fetchById = function (id) {
	        return $http.get('/api/components/.../' + id)
	            .then(getData)
	            .catch(function (error) {
	                console.error(error.message)
	            })
	    };
	    return ComponentFactory;
	})
	```
	- Directives
		* regular camel case

	Quick copy directive
	```js
	app.directive('categoryView', function () {
	    return {
	        restrict: 'E',
	        // scope: {},
	        templateUrl: 'js/common/directives/component/component.js',
	        link: function (scope, elements, attrs) {

	        }
	    };
	});
	```
	...and so on

Folders
----
Try to keep like things together.
Global directives go in the common/directives folder, global factories in the common/factories folder.

Err on the side of directives for reusable code.  
- Products
- Categories
- Navbar
- Orders? 

Working on a feature
----
Try to complete it end to end (ask for help if needed)

Write your tests and make sure they pass before doing a pull request (ask for help if needed)
