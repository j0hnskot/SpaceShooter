var tech_tree_state= function(game){
this.menu;
this.button;
this.sprite;
this.menu;
this.types;
this.weapon=new Weapon();
this.tech_tree_objects;
this.state;
//this.types=weapon.getAllTypes();
}



tech_tree_state.prototype={

preload: function(){
		game.scale.setShowAll();
    game.scale.setScreenSize();
  	game.load.image('window','assets/menu/window.png');
  	game.load.image('close_button','assets/menu/close_button.png');
	game.load.image('play_button','assets/play_button.png');
	game.load.image('tech_tree_button','assets/tech_tree_button.png');
},



create: function(){
	this.state=game.state.getCurrentState();
	this.tech_tree_objects=game.add.group();
	
	 this.menu=game.add.sprite(game.width/2,game.height/2,'window');
	 this.menu.anchor.setTo(0.5,0.5);
	 this.tech_tree_objects.add(this.menu);

	 this.back_button=game.add.button(10,20	,'back_button',this.returnToMenu,this);
	  this.tech_tree_objects.add(this.back_button);

	 this.close_button=game.add.button(this.menu.x+this.menu.width/2-15,this.menu.y-this.menu.height/2+15	,
	 	'close_button',this.closeMenu,this.close_button);
	 this.close_button.anchor.setTo(0.5,0.5);
	  this.tech_tree_objects.add(this.close_button);
	
	 this.rateOfFireText=game.add.text(this.menu.x,this.menu.y,'11',{fontSize:'20px',fill:'#ffffff'});
	 this.rateOfFireText.anchor.setTo(0.5,0.5);
	  this.tech_tree_objects.add(this.rateOfFireText);
	
	 this.damageText=game.add.text(this.menu.x,this.menu.y+30,'11',{fontSize:'22px',fill:'#ffffff'});
	 this.damageText.anchor.setTo(0.5,0.5);
	  this.tech_tree_objects.add(this.damageText);
	
	 this.costText=game.add.text(this.menu.x,this.menu.y+60,'11',{fontSize:'22px',fill:'#ffffff'});
	 this.costText.anchor.setTo(0.5,0.5);
	  this.tech_tree_objects.add(this.costText);
	
	 this.button=game.add.sprite(150,350, 'play_button');
	  this.button.inputEnabled=true;
	   this.tech_tree_objects.add(this.button);


	   this.tech_tree_objects.setAll('visible',false);


	// console.log(this.types.name);
	// for (var key of this.types){
	// 	console.log(key.rateOfFire);
	// }
	//console.log(this.types.length);
	
	// console.log(this.weapon.getAllTypes());
	// console.log(this.weapon.rateOfFire);
	// this.weapon=new Weapon('typeTwo');
	// console.log(this.weapon.rateOfFire);
	// //console.log(this.types.name.default.rateOfFire);
// this.button = game.add.button(game.width/2,game.height/2, 'play_button', this.actionOnClick,this.button);
//  this.button.anchor.setTo(0.5,0.5);
},

closeMenu : function(){
	//game.state.start('game');
	var state=game.state.getCurrentState();
	state.tech_tree.menu.visible=false;
	state.tech_tree.close_button.visible=false;
	state.tech_tree.rateOfFireText.visible=false;
	state.tech_tree.damageText.visible=false;
	state.tech_tree.costText.visible=false;
	state.tech_tree.button.visible=false;
	

},
buy: function(){
	console.log('cost '+this.cost);
	localStorage.setItem('got'+this.type,'true');
	this.visible=false;
	

},

returnToMenu: function(){
	
	this.tech_tree_objects.setAll('visible',false);
	this.state.menu_objects.setAll('visible',true);

},
showTechTree: function(){
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
		this.tech_tree_objects.add(this.sprite);
		console.log(this.weapon.rateOfFire);
	}

},

description: function(item){
	
	console.log(item.rateOfFire);

	this.rateOfFireText.text='Rate of fire: '+ item.rateOfFire;

	this.damageText.text='Damage: '+ item.damage;
	
	this.costText.text='Cost: '+ item.cost;
	this.tech_tree_objects.setAll('visible',true);
	
	if(localStorage.getItem('got'+item.type)=='false'){
		this.button.type=item.type;
		this.button.cost=item.cost;
		this.button.events.onInputDown.add(this.buy, this.button);
		this.button.visible=true;
	}else{
		this.button.visible=false;
		console.log(item.type);
		console.log(localStorage.getItem('got'+item.type));
		console.log('owned');
	}


}

};

