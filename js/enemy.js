Enemy = function (game){
	
	var x=((Math.random() * 400)+1); ;
	var y=-110;
	
	Phaser.Sprite.call(this, game, x, y, 'enemy_ship');
	// this.anchor.set(0.5);
	// this.scale.setTo(0.5,0.5);
	game.physics.arcade.enable(this);

	this.typeOfEnemy='normal';
	this.rateOfFire=250;
	this.lastTimeFired=0;
	this.health=3;
	this.alive=true;
	this.body.velocity.y=40;
	this.checkWorldBounds=true;
    this.outOfBoundsKill= true;
    console.log('called');
    console.log(x + ' ' +y);

}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;