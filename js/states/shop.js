var Shop= function(game){
this.menu;
this.buy_button;
this.sprite;
this.menu;
this.types;
this.weapon=new Weapon();
this.shop_objects;
this.state;
this.equip_button;

}



Shop.prototype={

preload: function(){
		game.scale.setShowAll();
    game.scale.setScreenSize();
  	game.load.image('window','assets/menu/window.png');
  	game.load.image('close_button','assets/menu/close_button.png');
	game.load.image('play_button','assets/play_button.png');
	game.load.image('shop_button','assets/shop_button.png');
	game.load.image('equip_button','assets/shop_button.png');

},



create: function(){
	this.state=game.state.getCurrentState();
	this.shop_objects=game.add.group();
	
	 this.menu=game.add.sprite(game.width/2,game.height/2,'window');
	 this.menu.anchor.setTo(0.5,0.5);
	 this.shop_objects.add(this.menu);

	 this.back_button=game.add.button(10,20	,'back_button',this.returnToMenu,this);
	  this.shop_objects.add(this.back_button);

	 this.close_button=game.add.button(this.menu.x+this.menu.width/2-15,this.menu.y-this.menu.height/2+15	,
	 	'close_button',this.closeMenu,this.close_button);
	 this.close_button.anchor.setTo(0.5,0.5);
	  this.shop_objects.add(this.close_button);
	
	 this.rateOfFireText=game.add.text(this.menu.x,this.menu.y,'11',{fontSize:'20px',fill:'#ffffff'});
	 this.rateOfFireText.anchor.setTo(0.5,0.5);
	  this.shop_objects.add(this.rateOfFireText);
	
	 this.damageText=game.add.text(this.menu.x,this.menu.y+30,'11',{fontSize:'22px',fill:'#ffffff'});
	 this.damageText.anchor.setTo(0.5,0.5);
	  this.shop_objects.add(this.damageText);
	
	 this.costText=game.add.text(this.menu.x,this.menu.y+60,'11',{fontSize:'22px',fill:'#ffffff'});
	 this.costText.anchor.setTo(0.5,0.5);
	  this.shop_objects.add(this.costText);
	
	 this.buy_button=game.add.sprite(150,350, 'play_button');
	  this.buy_button.inputEnabled=true;
	  this.shop_objects.add(this.buy_button);

	   this.equip_button=game.add.sprite(150,350, 'equip_button');
	  this.equip_button.inputEnabled=true;
	   this.shop_objects.add(this.equip_button);


	   this.shop_objects.setAll('visible',false);



},

closeMenu : function(){
	//game.state.start('game');
	var state=game.state.getCurrentState();
	state.shop.menu.visible=false;
	state.shop.close_button.visible=false;
	state.shop.rateOfFireText.visible=false;
	state.shop.damageText.visible=false;
	state.shop.costText.visible=false;
	state.shop.buy_button.visible=false;
	state.shop.equip_button.visible=false;
	

},
buy: function(){
	console.log(this.cost);
	var credits=parseInt(localStorage.getItem('credits'));
	if(this.cost<=credits){
	localStorage.setItem('got'+this.type,'true');
	credits-=this.cost;
	localStorage.setItem('credits',credits);
	this.visible=false;
	
	}else{
		console.log('not enought credits');
	}


},
equip: function(){
localStorage.setItem('equippedWeapon',this.type);
console.log('equiped');
this.visible=false;
},

returnToMenu: function(){
	
	this.shop_objects.setAll('visible',false);
	this.state.menu_objects.setAll('visible',true);

},
showShop: function(){
var state=game.state.getCurrentState();
	// state.tech_tree_button.visible=false;
	// state.start_button.visible=false;
	this.back_button.visible=true;
	this.types=this.weapon.getAllTypes();
	for(var i=0;i<this.types.length;i++){
		 
		this.weapon=new Weapon(this.types[i]);
		this.sprite =game.add.sprite(100+(i*100), 50, 'play_button');
		this.sprite.rateOfFire=this.weapon.rateOfFire;
		this.sprite.type=this.types[i];
		this.sprite.cost=this.weapon.cost;
		this.sprite.damage=this.weapon.damage;
		this.sprite.inputEnabled=true;
		this.sprite.events.onInputDown.add(this.description, this);
		console.log(this.sprite.rateOfFire);
		// game.add.button(150+((i-1)*100),50, 'play_button', this.actionOnClick,this.button);
 		this.sprite.anchor.setTo(0.5,0.5);
		// console.log(this.types[i]);
		// console.log(i);
		// this.sprite.visible=false;
		this.shop_objects.add(this.sprite);
		console.log(this.weapon.rateOfFire);
	}

},

description: function(item){
	
	console.log(item.rateOfFire);

	this.rateOfFireText.text='Rate of fire: '+ item.rateOfFire;

	this.damageText.text='Damage: '+ item.damage;
	
	this.costText.text='Cost: '+ item.cost;
	this.shop_objects.setAll('visible',true);
	
	if(localStorage.getItem('got'+item.type)=='false'){
		this.buy_button.type=item.type;
		this.buy_button.cost=item.cost;
		this.buy_button.events.onInputDown.add(this.buy, this.buy_button);
		this.buy_button.visible=true;
		this.equip_button.visible=false;
		console.log(localStorage.getItem('got'+item.type));
	}else{
		this.buy_button.visible=false;
		this.equip_button.visible=true;
		this.equip_button.type=item.type
		this.equip_button.events.onInputDown.add(this.equip, this.equip_button);
		console.log(item.type);
		console.log(localStorage.getItem('got'+item.type));
		console.log('owned');
	}


}

};

