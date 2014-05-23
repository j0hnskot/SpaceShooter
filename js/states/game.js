var game_state=function(game){


this.player_bullets;
this.enemies;
this.enemy_bullets;
this.isRunning=false;
this.timer;
this.spawnTime=1500;
this.playerHealth=5;
this.fpsText;
this.player=new Player(game);
this.enemy=new Enemy(game);
this.hud=new Hud(game);
this.powerUp=new Powerup(game);
this.weapon=new Weapon();
this.types;
this.emitter

}

game_state.prototype={
preload: function(){
// game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
	game.scale.setShowAll();
	game.scale.setScreenSize();
	this.player.preload();
	this.enemy.preload();
	this.powerUp.preload();
	game.load.image('player_bullet', 'assets/bullet.png');
	game.load.image('enemy_bullet', 'assets/enemy_bullet.png');
	game.load.image('background', 'assets/sky.png');
	game.load.image('explosion0', 'assets/explosion0.png');
	game.load.image('explosion1', 'assets/explosion1.png');
	game.load.image('explosion2', 'assets/explosion2.png');
  //   game.load.spritesheet('bird', 'assets/birdsheet.png',34,24);
  //   game.load.image('pipe-top','assets/pipe-top.png');
  //   game.load.image('pipe-bot','assets/pipe-bot.png');
  //    game.load.image('scoreWall','assets/scoreWall.png');
  //   game.load.audio('jump', 'assets/jump.ogg'); 

},


create: function() {
	//start physics
	game.world.setBounds(0, 0, 2480, 1100);

	game.physics.startSystem(Phaser.Physics.ARCADE);
	//create score
	
	
	//create background
	background=game.add.sprite(0, 0, 'background');
	
	//create player ship
	this.player.create();
	//game.add.existing(this.player);

	
	

		//create player bullet group
	this.player_bullets=game.add.group();

	//player_bullets.enableBody=true

	//player_bullets.createMultiple(20,'player_bullet');
	
	//create player invisible line 
	this.invisible_line=game.add.sprite(0,0,'');
	this.invisible_line.scale.y=800;
	
	game.physics.arcade.enable(this.invisible_line);
	//create enemy ship group
	this.enemies=game.add.group();
	//create power up group
	this.powerUps=game.add.group();
	//call the power up's random creation timer
	this.powerUp.create();
	//enemy spawn timer 
	timer=game.time.events.loop(this.spawnTime, this.addEnemy, this);
	
	//create enemy bullet group
	this.enemy_bullets=game.add.group();
	// enemy_bullets.enableBody=true;
	// enemy_bullets.createMultiple(200,'');
	
	//create effects for firing ,damage and death
	this.emitter = game.add.emitter(300,200, 100);
    this.emitter.makeParticles(['explosion0','explosion1','explosion2']);
    this.emitter.gravity=0;
    
    //this.emitter.lifespan=2000;
    this.emitter.minRotation = 0;
      this.emitter.setAlpha(0.1, 0.1)
    this.emitter.maxRotation = 0;
 	this.emitter.maxParticleSpeed=1;
   
       // this.emitter.start(false, 1000, 50, 30);

	//create sounds for firing ,damage and death

	//create music

	//score 
	this.types=this.weapon.getAllTypes();
	console.log(this.types);
	this.hud.create();
	this.hud.fpsEnabled=true;
	// score=0;
	// scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
	// //fps
	//   game.time.advancedTiming = true;
 //   		this.fpsText = this.game.add.text(
 //        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
 //    );
  
    
},

update: function() {

	this.emitter.forEachAlive(function(particle)
{
    particle.alpha = game.math.clamp(particle.lifespan / 1000, 0, 1);
}, this);

      //  If the sprite is > 8px away from the pointer then let's move to it
   this.hud.update();
   this.player.update();
 
 //check for overlap between player ship - enemy bullets  and calculate damage 
  game.physics.arcade.overlap(this.enemy_bullets, this.player.sprite, this.player.damaged, null, this.player);
 //check for overlap between player ship - enemy ship and calculate damage
 game.physics.arcade.overlap(this.player.sprite, this.enemies, this.enemy.touched, null, this)
 //check for overlap between enemy ship - player bullets and calculate score and damage (call enemyDamaged)
 game.physics.arcade.overlap(this.enemies, this.player_bullets,this.enemy.damaged, null, this);
 //check for overlap between enemy ship and invisible line drawn from the player. If it overlaps, enemy shoots
 game.physics.arcade.overlap(this.enemies, this.invisible_line, this.enemy.shoot, null, this);
//check for overlap between player ship and powerUps 
game.physics.arcade.overlap(this.player.sprite, this.powerUps, this.powerUp.apply, null, this);
//controls

		game.input.onDown.add(this.player.shoot,this.player);
		game.input.onUp.add(this.player.stopShoot,this.player);

},

render: function(){

   
},


addEnemy: function(){
	
	var enemy=new Enemy(game);
	enemy.addEnemy(game);
	//this.enemies.add(enemy);
	   
	//enemy.rateOfFire=250;

	// enemy=enemies.getFirstDead();
	//  enemy.reset(x,y);
	//  enemy.health=3;
	// enemy.body.velocity.y=40;
	// enemy.checkWorldBounds=true;
 //     enemy.outOfBoundsKill= true;
	
},





// playerShoot: function(){
// 	this.player.shooting=true;
// 	if (this.player.sprite.alive && this.player.lastTimeFired < game.time.now - this.player.weapon.rateOfFire) {
// 			console.log('player shoot');

// 		var bullet=new Bullet(game,this.player.sprite.x,this.player.sprite.y-82,'player')
// 		bullet.damage=this.player.weapon.damage;
// 		// bullet.checkWorldBounds=true;
// 		// bullet.outOfBoundsKill= true;
// 		// bullet.reset(player.x,player.y-82);
// 		// bullet.body.velocity.y=-400;
// 		this.player_bullets.add(bullet);
// 		this.player.lastTimeFired=game.time.now;

// 	}
// },

// playerStopShoot: function(){
// 	this.player.shooting=false;
// },

// enemyShoot: function(x,enemy){
// 	console.log('yy');
	
//  if (enemy.lastTimeFired < game.time.now - enemy.weapon.rateOfFire) {
//  	if(this.enemy_bullets.countDead()==0){
//  	//	console.log('new bullet');
// 		var bullet=new Bullet(game,enemy.x+40,enemy.y+59,'enemy')
// 		// var bullet=enemy_bullets.getFirstDead();
// 		bullet.checkWorldBounds=true;
// 		bullet.outOfBoundsKill= true;
// 		bullet.damage=enemy.weapon.damage;
// 		// bullet.reset(enemy.x+40,enemy.y+59);
// 			// bullet.body.velocity.y=400;
// 	//this.enemy_bullets.add(bullet)
// 	 }else{
// 		var bullet=this.enemy_bullets.getFirstDead();
// 	 	bullet.reset(enemy.x+40,enemy.y+59,'enemy');
// 	 	bullet.body.velocity.y=400;
	 	
// 	// 	  game.physics.arcade.enable(bullet);
// 	// 	bullet.body.velocity=400;
// 		bullet.checkWorldBounds=true;
// 	    bullet.outOfBoundsKill= true;
// 	    bullet.damage=enemy.weapon.damage;
// 	//     console.log('old bullet');
// 	 }
// 	    enemy.lastTimeFired = game.time.now;
// 	    // console.log('alive enemy bullets: '+ enemy_bullets.countLiving());
// 	    // console.log('dead enemy bullets: '+ enemy_bullets.countDead());
// 	  }

// },

removeLife: function(){

//remove a life 
//check if any life left else gameover

},

gameOver: function(){

},



};