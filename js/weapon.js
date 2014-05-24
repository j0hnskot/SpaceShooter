Weapon = function (type){
	var type;
	this.rateOfFire;
	this.damage;
	this.cost;
	this.bullet_velocity;
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
this.bullet_velocity=500
this.ammunition_type='bullet';

},

typeOne: function(){
	this.rateOfFire=100;
	this.damage=1;
	this.cost=150;
	this.key='typeOne';
	this.bullet_velocity=400;
	this.ammunition_type='bullet';
},

typeTwo: function(){
	this.rateOfFire=120;
	this.damage=2;
	this.cost=200;
	this.key='typeTwo';
	this.bullet_velocity=250;
	this.ammunition_type='bullet';
},

};

// Weapon.prototype = Object.create(null);
// Weapon.prototype.constructor = Weapon;