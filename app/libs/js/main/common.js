let i = '45';
function l(text){
	this.text=text;
	alert(this.text);
}
// l("Ktl");
let u = {
	name: "GGGG",
	say() {
		show(this);
	}
}

function show(i) {
	alert( i.name );
}


u.say();















































// function gel(power) {
// 	this.water = 0;
// 	var self = this;
// 	function ff() {
// 		return 5;
// 	}
// 	function onred() {
// 		alert( "Coffe is" + ff()+' '+self.water );
// 	}
// 	this.run = function() {
// 		setTimeout(onred, ff()*1000);
// 	}
// }

// var hel = new gel(600);
// hel.run();