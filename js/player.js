var Player = function (game){
	//this.game=game;
	this.sprite=null;
	this.call=game.state.callbackContext;

	this.x=200 ;
	this.y=200;
	
// 	Phaser.Sprite.call(this, game, x, y, 'player_ship');
// 	this.anchor.set(0.5);
// 	this.scale.setTo(0.5,0.5);
// 	this.alive=true;
	//this.rateOfFire=250;
	this.lastTimeFired=0;
	
	this.shooting=false;
	this.invicibility=0;
// 	game.physics.arcade.enable(this);

 	this.weapon;
 	this.state;
// console.log(this.weapon);	
	
 }
Player.prototype={

preload: function(){
 game.load.image('player_ship', 'assets/spaceship.png');
 game.load.audio('shoot', 'assets/sound/Laser1.wav');

},
create: function(){
	this.state=game.state.getCurrentState();
	this.weapon=new Weapon(localStorage.getItem('equippedWeapon'));
	this.sprite=game.add.sprite(this.x,this.y,'player_ship');
	this.sprite.anchor.set(0.5);
	this.sprite.scale.setTo(0.5,0.5);
	this.sprite.alive=true;
	this.sprite.health=10;
	game.physics.arcade.enable(this.sprite);
	this.shoot_sound = game.add.audio('shoot');

},
update: function(){
	if (this.sprite.alive){
		if(this.shooting){
				this.shoot();
			}
	 
		if (game.physics.arcade.distanceToPointer(this.sprite, game.input.activePointer) >10)
	    {
	        //  Make the object seek to the active pointer (mouse or touch).
	        game.physics.arcade.moveToPointer(this.sprite, 300);
	      	game.state.callbackContext.invisible_line.x=this.sprite.x;
	    }
	    else
	    {
	        //  Otherwise turn off velocity because we're close enough to the pointer
	        this.sprite.body.velocity.set(0);
	    }
	}
},

shoot: function(){
	this.shooting=true;

	if (this.sprite.alive && this.lastTimeFired < game.time.now - this.weapon.rateOfFire) {
			

		var bullet=new Bullet(game,this.sprite.x,this.sprite.y-82,'player')
		bullet.damage=this.weapon.damage;
		// bullet.checkWorldBounds=true;
		// bullet.outOfBoundsKill= true;
		// bullet.reset(player.x,player.y-82);
		// bullet.body.velocity.y=-400;
		//console.log(this);
		//	console.log();
		//this.game.state.states.game.player_bullets.add(bullet);
		//game.state.callbackContext.player_bullets.add(bullet);
		//player_bullets
		this.lastTimeFired=game.time.now;
//		this.shoot_sound.play();

	}
},

stopShoot: function(){
	this.shooting=false;
},

dead: function(){
	console.log('died');
	this.state.emitter.x = this.sprite.x;
    this.state.emitter.y = this.sprite.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    this.state.emitter.start(false, 1000, 50, 50);
	
   // this.emitter.gravity = 200;
},

 damaged: function(player,bullet){
	bullet.kill();
	player.damage(bullet.damage); 
	if (!player.alive){
		this.dead();
		//game.state.start('menu');
	}
	//console.log(game.state.callbackContext.hud);
	game.state.callbackContext.hud.updateHealth();
	//console.log(player.health);
	//console.log(player);
	//calculate how much damage the player took 
	//call removeLife if needed
},



};


// Player.prototype = Object.create(Phaser.Sprite.prototype);
// Player.prototype.constructor = Player;

// Player.prototype.setWeapon = function(weapon){

//  	this.weapon=new Weapon(weapon);
//  };

//  Player.prototype.preload=function(){
//   game.load.image('player_ship', 'assets/spaceship.png');

//  };