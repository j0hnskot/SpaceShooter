Bullet = function (game,x,y,weapon,type){
	var velocity;
	var key;
	var sprite;
	var state=game.state.callbackContext;
		

	
	Phaser.Sprite.call(this, game, x, y, type+'_'+weapon.ammunition_type);

	this.checkWorldBounds=true;
   this.outOfBoundsKill= true;
	game.physics.arcade.enable(this);

	this.alive=true;
	this.damage=weapon.damage;
	this.body.velocity.y=weapon.bullet_velocity;
	

 
if(type=='enemy'){	
			state.enemy_bullets.add(this);
	}else{

		state.player_bullets.add(this);
	}
	

}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.resetProperties= function(x,y,weapon,type){
	
	if(this.key!=type+'_'+weapon.ammunition_type){
		this.loadTexture(type+'_'+weapon.ammunition_type);
	}
	this.damage=weapon.damage;
	this.reset(x,y);
	this.body.velocity.y=weapon.bullet_velocity;
	
}

