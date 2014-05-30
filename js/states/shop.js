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
this.equipped_button;
this.credits

}



Shop.prototype={





create: function(){
	this.credits=parseInt(localStorage.getItem('credits'));
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
	
	this.creditsText=game.add.text(100,game.height-50,'Credits: '+this.credits ,{fontSize:'20px',fill:'#c1bcbc'});
	 this.creditsText.anchor.setTo(0.5,0.5);

	 this.shop_objects.add(this.creditsText);

	this.notEnoughCreditsText=game.add.text(110,game.height-150,'Not enough credits.' ,{fontSize:'20px',fill:'#a00000'});
	 this.notEnoughCreditsText.alpha=0;
	

	this.weaponNameText=game.add.text(this.menu.x,this.menu.y-100,'11',{fontSize:'20px',fill:'#c1bcbc'});
	 this.weaponNameText.anchor.setTo(0.5,0.5);
	  this.shop_objects.add(this.weaponNameText);



	 this.rateOfFireText=game.add.text(this.menu.x,this.menu.y,'11',{fontSize:'20px',fill:'#c1bcbc'});
	 this.rateOfFireText.anchor.setTo(0.5,0.5);
	  this.shop_objects.add(this.rateOfFireText);
	
	 this.damageText=game.add.text(this.menu.x,this.menu.y+30,'11',{fontSize:'22px',fill:'#c1bcbc'});
	 this.damageText.anchor.setTo(0.5,0.5);
	  this.shop_objects.add(this.damageText);
	
	 this.costText=game.add.text(this.menu.x,this.menu.y+60,'11',{fontSize:'22px',fill:'#c1bcbc'});
	 this.costText.anchor.setTo(0.5,0.5);
	  this.shop_objects.add(this.costText);
	
	 this.buy_button=game.add.sprite(this.menu.x,this.menu.y+150, 'buy_button');
	 this.buy_button.anchor.setTo(0.5,0.5);
	  this.buy_button.inputEnabled=true;
	  this.shop_objects.add(this.buy_button);

	   this.equip_button=game.add.sprite(this.menu.x,this.menu.y+150, 'equip_button');
	   this.equip_button.anchor.setTo(0.5,0.5);
	  this.equip_button.inputEnabled=true;
	   this.shop_objects.add(this.equip_button);

 	this.equipped_button=game.add.sprite(this.menu.x,this.menu.y+150, 'equipped_button');
 	this.equipped_button.anchor.setTo(0.5,0.5);
	this.shop_objects.add(this.equipped_button);
	this.equipped_button.visible=false;

	   this.shop_objects.setAll('visible',false);



},

closeMenu : function(){
	//game.state.start('game');
	var state=game.state.getCurrentState();
	state.shop.menu.visible=false;
	state.shop.close_button.visible=false;
	state.shop.rateOfFireText.visible=false;
	state.shop.damageText.visible=false;
	state.shop.weaponNameText.visible=false;
	state.shop.costText.visible=false;
	state.shop.buy_button.visible=false;
	state.shop.equip_button.visible=false;
	state.shop.equipped_button.visible=false;

},
buy: function(){
	
	var credits=parseInt(localStorage.getItem('credits'));
	if(this.buy_button.cost<=credits){
	localStorage.setItem('got'+this.buy_button.type,'true');
	credits-=this.buy_button.cost;
	localStorage.setItem('credits',credits);
	this.buy_button.visible=false;
	this.equip_button.visible=true;
	this.equip_button.type=this.buy_button.type
	this.equip_button.events.onInputDown.add(this.equip, this);
	this.creditsText.text='Credits: '+credits;
	}else{
		game.add.tween(this.notEnoughCreditsText).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None)
		.to({alpha:0},500,Phaser.Easing.Linear.None)
		.start();
	}


},
equip: function(){
localStorage.setItem('equippedWeapon',this.equip_button.type);


this.equip_button.visible=false;
this.equipped_button.visible=true;
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
	this.creditsText.visible=true;
	this.types=this.weapon.getAllTypes();
	for(var i=0;i<this.types.length;i++){
		 
		this.weapon=new Weapon(this.types[i]);
		this.sprite =game.add.sprite(100+(i*100), 50, this.weapon.type);
		this.sprite.rateOfFire=this.weapon.rateOfFire;
		this.sprite.type=this.types[i];
		this.sprite.cost=this.weapon.cost;
		this.sprite.damage=this.weapon.damage;
		this.sprite.inputEnabled=true;
		this.sprite.events.onInputDown.add(this.description, this);
		
		// game.add.button(150+((i-1)*100),50, 'play_button', this.actionOnClick,this.button);
 		this.sprite.anchor.setTo(0.5,0.5);
		
		this.shop_objects.add(this.sprite);
	
	}

},

description: function(item){
	
	
	this.weaponNameText.text='Weapon: '+ item.type;
	this.rateOfFireText.text='Rate of fire: '+ item.rateOfFire;

	this.damageText.text='Damage: '+ item.damage;
	
	this.costText.text='Cost: '+ item.cost;
	this.shop_objects.setAll('visible',true);
	
	if(localStorage.getItem('got'+item.type)=='false'){
		this.buy_button.type=item.type;
		this.buy_button.cost=item.cost;
		this.buy_button.events.onInputDown.add(this.buy, this);
		this.buy_button.visible=true;
		this.equip_button.visible=false;
		this.equipped_button.visible=false;

	
	}else{
		this.buy_button.visible=false;
		this.equipped_button.visible=false;
		this.equip_button.visible=false;
		if(localStorage.getItem('equippedWeapon')==item.type){
		
			this.equip_button.visible=false;
			this.equipped_button.visible=true;



		}else{
				this.equip_button.visible=true;
				this.equipped_button.visible=false;
			this.equip_button.type=item.type
			this.equip_button.events.onInputDown.add(this.equip, this);
		}
		
		
		
	}


}

};

