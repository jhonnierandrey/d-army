var x = 9;

var module = {
	x : 85,
	getX : function() {
		console.log(this.x);
	}
}

//module.getX();

var retrieveX = module.getX;

//retrieveX();

var context = {
	x : 55
};

//var bindGetX = retrieveX.bind(context);
//bindGetX();


console.log(retrieveX.call(context));