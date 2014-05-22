Bullet = function (game,x,y,type){
	var velocity;
	var key;
	var sprite;
	var call=game.state.callbackContext;
		if(type=='enemy'){
			key='enemy_bullet';
			velocity=400;
		}else{
			key='player_bullet';
			velocity=-400;
		}

	
	Phaser.Sprite.call(this, game, x, y, key);
//	Phaser.Sprite.call(this, game, x, y, key);
	this.checkWorldBounds=true;
   this.outOfBoundsKill= true;
	game.physics.arcade.enable(this);

	this.alive=true;
	this.body.velocity.y=velocity;
	
	
 // console.log(this);
if(type=='enemy'){	
			call.enemy_bullets.add(this);
	}else{

		call.player_bullets.add(this);
	}
	//this.events.onOutOfBounds.add(this.destroyBullet, this);

}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.destroyBullet= function(bullet){
	console.log(bullet);
	bullet.destroy();
	console.log('destroyed');
}

