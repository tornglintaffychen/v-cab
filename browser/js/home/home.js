app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
				//TODO:
				//considering using views: http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-view
				// views:{

				// }
    });
});
