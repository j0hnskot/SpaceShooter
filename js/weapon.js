Weapon = function (type){
	var type;
	this.rateOfFire;
	this.damage;
	this.cost;
	if(typeof(type)==='undefined'){
		this.type='typeZero';
	}else{
		this.type=type;
	}
	
	switch(this.type){
		case 'typeZero':
			this.typeZero();
			break;
		case 'typeOne':
			this.typeOne();
			break;
		case 'typeTwo':
			this.typeTwo();
			break;

	}
 // console.log(this);

}

Weapon.prototype={

getAllTypes: function(){
//this.listOfTypes={name:['default','typeOne','typeTwo'],rateOfFire:[11,11,12]};
this.listOfTypes=['typeZero','typeOne','typeTwo'];

return this.listOfTypes;
},


typeZero: function(){

this.rateOfFire=250;
this.damage=1;
this.cost=100;
this.key='typeZero';

},

typeOne: function(){
	this.rateOfFire=100;
	this.damage=1;
	this.cost=100;
	this.key='typeOne';
},

typeTwo: function(){
	this.rateOfFire=120;
	this.damage=2;
	this.cost=200;
	this.key='typeTwo';
},

};

// Weapon.prototype = Object.create(null);
// Weapon.prototype.constructor = Weapon;