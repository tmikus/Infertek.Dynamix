/*
	Checks if 'isArray' method is defined for an 'Array' object.
*/
if (!Array.isArray) {
	Array.isArray = function (arg) {
		return Object.prototype.toString.call(arg) == '[object Array]';
	};
}
if(!Function.isFunction) {
	Function.isFunction = function(arg) {
		return Object.prototype.toString.call(arg) == "[object Function]";
	};
}