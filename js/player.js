var Player = function (game){
	//this.game=game;
	this.sprite=null;

	this.x=game.width/2 ;
	this.y=game.height/2;
	this.lastTimeFired=0;	
	this.shooting=false;
	this.invicibility=0;
 	this.weapon;
 	this.state;
	
	
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
	
	this.sprite.alive=true;
	this.sprite.health=10;
	game.physics.arcade.enable(this.sprite);
	this.sprite.body.setSize(this.sprite.width,this.sprite.height,0,this.sprite.height/4);
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
	         this.state.invisible_line.x=this.sprite.x;
	        
	      	
	    }
	    else
	    {
	        //  Otherwise turn off velocity because we're close enough to the pointer
	        this.sprite.body.velocity.set(0);
	       	this.state.invisible_line.x=this.sprite.x;
	      
	    }
	}
},

shoot: function(){
	//this.shooting=true;
	var bullet;
	if (this.sprite.alive && this.lastTimeFired < game.time.now - this.weapon.rateOfFire) {
		
		if(this.state.player_bullets.getFirstDead()){
			bullet=this.state.player_bullets.getFirstDead();
			bullet.resetProperties(this.sprite.x,this.sprite.y-82,this.weapon,'player');
		}else{
			bullet=new Bullet(game,this.sprite.x,this.sprite.y-82,this.weapon,'player')
		}

		
		
		bullet.body.velocity.y*=-1;
		this.lastTimeFired=game.time.now;
//		this.shoot_sound.play();

	}
},

// stopShoot: function(){
// 	this.shooting=false;
// },

dead: function(){
	console.log('died');
	this.state.invisible_line.kill();
	this.state.spawners.forEach(function(timerEvent){
		timerEvent.timer.remove(timerEvent);
	//	console.log(yolo);
	})

	this.state.spawners=[];
	console.log(this.state.spawners.length);
	this.state.emitter.x = this.sprite.x;
    this.state.emitter.y = this.sprite.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    this.state.emitter.start(false, 1000, 50, 50);
    this.timer = game.time.create();
	
	this.timer.add(2000,this.state.afterBattleMenu, this);
	this.timer.start();
  
},

 damaged: function(player,bullet){
	bullet.kill();
	player.damage(bullet.damage); 
	if (!player.alive){
		this.dead();
	
	}
	
	this.state.hud.updateHealth();
	
},



};

