Bullet = function (game,x,y,weapon,type){
	var velocity;
	var key;
	var sprite;
	var call=game.state.callbackContext;
		

	
	Phaser.Sprite.call(this, game, x, y, type+'_'+weapon.ammunition_type);

	this.checkWorldBounds=true;
   this.outOfBoundsKill= true;
	game.physics.arcade.enable(this);

	this.alive=true;
	this.damage=weapon.damage;
	this.body.velocity.y=weapon.bullet_velocity;
	
	
 
if(type=='enemy'){	
			call.enemy_bullets.add(this);
	}else{

		call.player_bullets.add(this);
	}
	

}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.destroyBullet= function(bullet){
	console.log(bullet);
	bullet.destroy();
	console.log('destroyed');
}

