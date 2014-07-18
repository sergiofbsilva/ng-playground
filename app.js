var myApp = angular.module('app', []);

myApp.factory('ItemFactory', function() {
   
    var service = function() {
        return {
            items : [],
            load : function(items) {
                this.items = items;
            },
            first : function() {
                return this.items.length > 0 && this.items[0];
            },
            get : function(i) {
                return (i >= 0 && i <= this.items.length === -1) && this.items[i];
            }
        };
    };
    
    var factory = {
        cache : {},
        get : function(key) {
            var instance = null;
            if (_.has(this.cache, key)) {
                instance = this.cache[key]; 
            } else {
                instance = this.cache[key] = service();
            }
            return instance;
        }
    };
    
    return factory;
    
}).controller('FruitCtrl', function(ItemFactory, $scope) {
    $scope.model = ItemFactory.get("fruits");
    $scope.model.load([{name : "apple", sugarLevel : "medium"}, {name : "orange", sugarLevel : "high"}, {name : "banana", sugarLevel : "low"}]);
}).controller('CarCtrl', function(ItemFactory, $scope) {
    $scope.model = ItemFactory.get("cars");
    $scope.model.load([{name : "Polo", brand : "VW"}, {name : "A5", brand : "Audi"}, {name : "500", brand : "Fiat"}]);
}).controller('EditAllCtrl', function(ItemFactory, $scope) {
    var fruits = ItemFactory.get("fruits");
    var cars = ItemFactory.get("cars");
    
    $scope.items = _.union(fruits.items, cars.items);
});