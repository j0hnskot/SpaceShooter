Player = function (game){
	
	var x=200 ;
	var y=200;
	
	Phaser.Sprite.call(this, game, x, y, 'player_ship');
	this.anchor.set(0.5);
	this.scale.setTo(0.5,0.5);
	this.alive=true;
	this.rateOfFire=250;
	this.lastTimeFired=0;
	this.health=10;
	this.shooting=false;
	this.invicibility=0;
	game.physics.arcade.enable(this);

	
	console.log('player called');
    

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;