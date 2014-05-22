var menu_state= function(game){

this.button;
}



menu_state.prototype={

preload: function(){
		game.scale.setShowAll();
    game.scale.setScreenSize();
	game.load.image('play_button','assets/play_button.png');
},



create: function(){
	console.log(score);
this.button = game.add.button(game.width/2,game.height/2, 'play_button', this.actionOnClick,this.button);
 this.button.anchor.setTo(0.5,0.5);
},

actionOnClick : function(){
	game.state.start('game');
}

};

