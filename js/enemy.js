Enemy = function (game){
	this.sprite=null
	

 }

Enemy.prototype={

preload: function(){
    game.load.image('enemy_ship', 'assets/enemy_ship.png');


},

createEnemy : function(){


},
addEnemy: function(){
	this.x=((Math.random() * 400)+1); ;
	this.y=-100;
	//this.sprite=Phaser.Sprite.call(this, game, this.x, this.y, 'enemy_ship');
	if(game.state.callbackContext.enemies.countDead()==0){
		this.sprite=game.add.sprite(this.x,this.y,'enemy_ship');
	}else{

		this.sprite=game.state.callbackContext.enemies.getFirstDead();
		this.sprite.reset(this.x,this.y);
	//	console.log('revived');
	}
	
	this.sprite.anchor.set(0.5);
	//this.sprite.scale.setTo(0.5,0.5);
	this.sprite.alive=true;
	this.sprite.health=3;
	this.sprite.lastTimeFired=0;
	game.physics.arcade.enable(this.sprite);
	this.sprite.checkWorldBounds=true;
	this.sprite.outOfBoundsKill=true;
	this.sprite.body.velocity.y=100;
	this.sprite.weapon=new Weapon();
	game.state.callbackContext.enemies.add(this.sprite);
	//console.log(this.sprite.body);
	//console.log(game.state.callbackContext.enemies.countLiving());
	//console.log(game.state.callbackContext.enemies.countDead());
},
update: function(){
	
},

shoot: function(x,enemy){
	

	if (enemy.alive && enemy.lastTimeFired < game.time.now - enemy.weapon.rateOfFire) {
			

		var bullet=new Bullet(game,enemy.x,enemy.y+59,'enemy')
		bullet.damage=enemy.weapon.damage;
		// bullet.checkWorldBounds=true;
		// bullet.outOfBoundsKill= true;
		// bullet.reset(player.x,player.y-82);
		// bullet.body.velocity.y=-400;
		//console.log(this);
		//	console.log();
		//this.game.state.states.game.player_bullets.add(bullet);
		//game.state.callbackContext.enemy_bullets.add(bullet);
		//player_bullets
		enemy.lastTimeFired=game.time.now;

	}
},

damaged: function(enemy,bullet){
	var state=game.state.getCurrentState();
//increase score
score+=bullet.damage;
	scoreText.text='Score: '+score;
	bullet.kill();
	//console.log('hit');
	//console.log(enemy);

	//damage enemy
	enemy.damage(bullet.damage);
	if(!enemy.alive){
	state.emitter.x = enemy.x;
    state.emitter.y = enemy.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    state.emitter.start(false, 500, 40, 10);
	}
	


},
 
touched: function(player,enemy){

	//damage enemy for spesific amount
	enemy.damage(1);
	//damage player for specific amount 
	player.damage(1)

	if (!player.alive){
		game.state.start('menu');
	}
	//console.log('touched')
	//call removeLife if needed

},


};


// Enemy.prototype = Object.create(Phaser.Sprite.prototype);
// Enemy.prototype.constructor = Enemy;

// Enemy.prototype.setWeapon = function(weapon){

//  	this.weapon=new Weapon(weapon);
//  };