Bullet = function (game,x,y,type){
	var velocity;
	var key;
		if(type=='enemy'){
			key='enemy_bullet';
			velocity=400;
		}else{
			key='player_bullet';
			velocity=-400;
		}

	
	Phaser.Sprite.call(this, game, x, y, key);
	game.physics.arcade.enable(this);

	this.alive=true;
	this.body.velocity.y=velocity;
	this.checkWorldBounds=true;
    this.outOfBoundsKill= true;
    console.log(key +' bullet called');
    console.log(x + ' ' +y);

}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;