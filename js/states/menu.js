var menu_state= function(game){

this.menu_button;
this.shop_button
this.shop=new Shop();
this.menu_objects;
}



menu_state.prototype={

preload: function(){
		game.scale.setShowAll();
    game.scale.setScreenSize();
    this.shop.preload();
	game.load.image('start_game_button','assets/start_game_button.png');
	game.load.image('back_button','assets/bacK_button.png');

},



create: function(){

if(localStorage.getItem('spaceShooter.firstRun')===null){
	localStorage.setItem('spaceShooter.firstRun','true');
}
if(localStorage.getItem('spaceShooter.firstRun')=='true'){
	localStorage.setItem('spaceShooter.firstRun','false');
	localStorage.setItem('gottypeZero','true');
	localStorage.setItem('gottypeOne','false');
	localStorage.setItem('gottypeTwo','false');
	localStorage.setItem('score','0');
	localStorage.setItem('equippedWeapon','typeOne');
	localStorage.setItem('credits','0')
	localStorage.setItem('dateCreated',new Date())
	console.log('first run');
}else{
	console.log(localStorage);	
}
this.menu_objects=game.add.group();
	
this.start_button = game.add.button(game.width/2,game.height/2, 'start_game_button', this.startGame,this.button);
 this.start_button.anchor.setTo(0.5,0.5);

 this.menu_objects.add(this.start_button);

 this.shop_button = game.add.button(game.width/2,game.height/2+100, 'shop_button'
 					, this.showShop,this);
 this.shop_button.anchor.setTo(0.5,0.5);
  this.menu_objects.add(this.shop_button);

this.shop.create();
},

startGame : function(){
	game.state.start('game');
},

startMenu: function(){

},

showShop: function(){

	this.menu_objects.setAll('visible',false);
	console.log(this.menu_objects);
	this.shop.showShop();
},

};

