var Player = function (game){
	//this.game=game;
	this.sprite=null;

	this.x=game.width/2 ;
	this.y=game.height/2;
	this.lastTimeFired=0;	
	this.shooting=false;
	this.invicibility;
 	this.weapon;
 	this.powerUp;
 	this.state;
 	this.shield;
 	this.lowHealth;
 	this.lowHealthTween;
	
	
 }
Player.prototype={

// preload: function(){


// },
create: function(){
	this.powerUp={
		shield: 0,
		rateOfFire:0,
		invicibility:false,

	}
	this.lowHealth=game.add.sprite(0,0,'lowHealth');
	this.lowHealth.scale.y=800;
	this.lowHealth.scale.x=480;
	this.lowHealth.alpha=0;
	this.lowHealthTween=game.add.tween(this.lowHealth).to( { alpha: 0.2 }, 500, Phaser.Easing.Linear.None)
						.to( { alpha: 0 }, 500, Phaser.Easing.Linear.None);

	this.state=game.state.getCurrentState();
	this.weapon=new Weapon(localStorage.getItem('equippedWeapon'));
	this.sprite=game.add.sprite(this.x,this.y,'player_ship');
	this.sprite.anchor.set(0.5);
	
	this.sprite.alive=true;
	this.sprite.health=10;
	game.physics.arcade.enable(this.sprite);
	this.sprite.body.setSize(this.sprite.width,this.sprite.height,0,this.sprite.height/4);
	this.shoot_sound = game.add.audio('shoot',0.1);

	this.shield=game.add.sprite(0,-25,'shield');
	this.shield.anchor.set(0.5);
	this.shield.alpha=0;
	this.sprite.addChild(this.shield);

	this.invicibility=game.add.sprite(0,0,'invicibility');
	this.invicibility.anchor.set(0.5);
	this.invicibility.alpha=0;
	this.sprite.addChild(this.invicibility);
	console.log(this.invicibility);

},
update: function(){
	if (this.sprite.alive){
		if(this.shooting){
				this.shoot();
			}
	 
		if (game.physics.arcade.distanceToPointer(this.sprite, game.input.activePointer) >20)
	    {
	        //  Make the object seek to the active pointer (mouse or touch).
	        game.physics.arcade.moveToPointer(this.sprite, 300);
	        // this.state.invisible_line.x=this.sprite.x;
	        
	      	
	    }
	    else
	    {
	        //  Otherwise turn off velocity because we're close enough to the pointer
	        this.sprite.body.velocity.set(0);
	       	//this.state.invisible_line.x=this.sprite.x;
	      
	    }
	}
},

shoot: function(){
	//this.shooting=true;
	var bullet;
	if (this.sprite.alive && 
		this.lastTimeFired < game.time.now - (this.weapon.rateOfFire+this.powerUp.rateOfFire)) {
		
		if(this.state.player_bullets.getFirstDead()){
			bullet=this.state.player_bullets.getFirstDead();
			bullet.resetProperties(this.sprite.x,this.sprite.y-82,this.weapon,'player');
		}else{
			bullet=new Bullet(game,this.sprite.x,this.sprite.y-82,this.weapon,'player')
		}

		
		
		bullet.body.velocity.y*=-1;
		this.lastTimeFired=game.time.now;
	this.shoot_sound.play();

	}
},

// stopShoot: function(){
// 	this.shooting=false;
// },

dead: function(){
	console.log('died');
	this.state.invisible_line.kill();
	this.shield.kill();
	this.state.spawners.forEach(function(timerEvent){
		timerEvent.timer.remove(timerEvent);
	//	console.log(yolo);
	})

	this.state.spawners=[];
	console.log(this.state.spawners.length);
	this.explode();
	// this.state.emitter.on=false;
	// this.state.emitter.x = this.sprite.x;
 //    this.state.emitter.y = this.sprite.y;

 //    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
 //    //  The second gives each particle a 2000ms lifespan
 //    //  The third is ignored when using burst/explode mode
 //    //  The final parameter (10) is how many particles will be emitted in this single burst
 //    this.state.emitter.start(false, 500, 40, 10);
    this.timer = game.time.create();
	
	this.timer.add(2000,this.state.afterBattleMenu, this);
	this.timer.start();
  
},
explode: function() {
  // first get an explosion from the pool
  var emitter = this.state.explosionPool[this.state.currentExplosion];
  // place the emitter position at the enemy's position via Point.copyFrom
  emitter.position.copyFrom(this.sprite.position);
  emitter.start(false, 500, 40, 10);
  // increase currentExplosion by 1, ensuring it wraps around back to 0
  // when it reaches the length of the pool array
  this.state.currentExplosion = 
  				Phaser.Math.wrap(this.state.currentExplosion + 1, 0, this.state.explosionPool.length);
},

 damaged: function(player,bullet){
	bullet.kill();
	if(!this.powerUp.invicibility){
		if(this.powerUp.shield>0){
			if(this.powerUp.shield>=bullet.damage){
				this.powerUp.shield-=bullet.damage;
				console.log('shield');
				console.log(this.powerUp.shield);
			}else{
				player.damage(bullet.damage-this.powerUp.shield);

				console.log('shield');
				console.log(this.powerUp.shield);

				this.powerUp.shield=0;
				
				console.log('shield ended');

			}
			if(this.powerUp.shield==0){this.removeShield();}
		}else{
			player.damage(bullet.damage); 
		}

		if (!player.alive){
			this.dead();

		}else{
			if(player.health<5){
					this.gotLowHealth();
					console.log('q');
				}else{
					console.log('no low health');
					console.log(player.health);
				}
		}

		this.state.hud.updateHealth();
	}
},

touched: function(player,enemy){
	
	//damage enemy for spesific amount
	enemy.damage(1);
	if(enemy.alive==false){
		this.state.enemy.explode(enemy);
	}
	//damage player for specific amount 
	//player.damage(1)
	if(!this.powerUp.invicibility){
		if(this.powerUp.shield>0){

			this.powerUp.shield-=1;
			console.log('shield touched');
			console.log(this.powerUp.shield);
			if(this.powerUp.shield==0){this.removeShield();};

		}else{
			console.log('no shield');
			player.damage(1); 
		}
		this.state.hud.updateHealth();
		if (!player.alive){
			this.state.player.dead();
		}

	}

},

gotShield: function(){
	console.log('called gotshield');
		if(this.shield.alpha==0){
			game.add.tween(this.shield).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None,true);
		}
},

removeShield: function(){
	console.log('called removeShield');
	if(this.shield.alpha==1){
			game.add.tween(this.shield).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None,true);
		}
},

gotInvicibility: function(){

		if(this.invicibility.alpha==0){
			game.add.tween(this.invicibility).to( { alpha: 0.5 }, 500, Phaser.Easing.Linear.None,true);
		}
},

removeInvicibility: function(){
	
	if(this.invicibility.alpha==0.5){
			game.add.tween(this.invicibility).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None,true);
		}
},

gotLowHealth: function(){
	console.log('got low health');
	console.log(this.lowHealthTween);
	console.log(this.lowHealthTween._paused);
	if(this.lowHealthTween._paused){
		console.log('resumed');
		this.lowHealthTween.resume();
		console.log(this.lowHealthTween);
	}else{
		this.lowHealthTween.loop();
		this.lowHealthTween.start();
	}
},

noLowHealth: function(){
	this.lowHealth.alpha=0;
	this.lowHealthTween.pause();
},

};

