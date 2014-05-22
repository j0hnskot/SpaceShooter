Weapon = function (type){
	var type;
	if(typeof(type)==='undefined'){
		this.type='default';
	}else{
		this.type=type;
	}
	
	switch(this.type){
		case 'default':
			this.rateOfFire=250;
			this.damage=1;
			break;
		case '1':
			this.rateOfFire=50;
			this.damage=2;
			break;

	}
 // console.log(this);

}

Weapon.prototype = Object.create(null);
Weapon.prototype.constructor = Weapon;