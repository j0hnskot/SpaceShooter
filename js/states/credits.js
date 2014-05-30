var Credits= function(game){



this.shop_objects;
this.state;
this.creditsText;

}



Credits.prototype={

// preload: function(){
// 		game.scale.setShowAll();
//     game.scale.setScreenSize();
  	
// },



create: function(){
	
	this.state=game.state.getCurrentState();
	this.credits_objects=game.add.group();
	
	

	 this.back_button=game.add.button(10,20	,'back_button',this.returnToMenu,this);
	  this.credits_objects.add(this.back_button);

	this.creditsText=game.add.text(game.width/2-230,game.height/2-270,'A game created by John Skotiniotis(@j0hnskot)'+
		'\n\n\n\n Phaser framework was used to create this game'+
		'\n\nEvery image and sound not created by me \nis found in opengameart.org'+
		'\n\n Menu and Ingame music by @FoxSynergy'+
		'\n\n Gameover music by Sudocolon'+
		'\n\n Spaceship art by Xavier4321 and Skorpio'+
		'\n\n Explosion art by GameProgrammingSlave'+
		'\n\n Background image by beren77 ,changed a bit by me '+
		'\n\n\n You can find links to all material used and their license'+
		'\nat bit.ly/1ttb8kX' ,{font:'18px Arial',fill:'#c1bcbc',align:'center',wordWrap:true,wordWrapWidth:450});
	// this.creditsText.anchor.set(0.5);
		  this.credits_objects.add(this.creditsText);
	   this.credits_objects.setAll('visible',false);



},

closeCredits : function(){
	//game.state.start('game');
	var state=game.state.getCurrentState();
	
	state.shop.close_button.visible=false;
	

},

returnToMenu: function(){
	
	this.credits_objects.setAll('visible',false);
	this.state.menu_objects.setAll('visible',true);

},
show: function(){
var state=game.state.getCurrentState();
	// state.tech_tree_button.visible=false;
	// state.start_button.visible=false;
	
	this.credits_objects.setAll('visible',true);
	
	

},



};

