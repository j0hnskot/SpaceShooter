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
}

game_state.prototype={
preload: function(){
// game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
     game.scale.setShowAll();
    game.scale.setScreenSize();
    this.player.preload();
  
    game.load.image('player_bullet', 'assets/bullet.png');
      game.load.image('enemy_bullet', 'assets/enemy_bullet.png');
     game.load.image('background', 'assets/sky.png');
    
   game.load.image('enemy_ship', 'assets/enemy_ship.png');

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
	this.invisible_line=game.add.sprite(0,0,'enemy_bullet');
	this.invisible_line.scale.y=800;
	
	game.physics.arcade.enable(this.invisible_line);
	//create enemy ship group
	this.enemies=game.add.group();
	
	//enemy spawn timer 
	timer=game.time.events.loop(this.spawnTime, this.addEnemy, this);
	//create enemy bullet group
	this.enemy_bullets=game.add.group();
	// enemy_bullets.enableBody=true;
	// enemy_bullets.createMultiple(200,'');
	
	//create sounds for firing ,damage and death
	//create music
	//create life bar
	//score 
	score=0;
	scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
	//fps
	  game.time.advancedTiming = true;
   		this.fpsText = this.game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );
  
    
},

update: function() {
scoreText.text = 'Score: ' + score; 

if (game.time.fps !== 0) {
        this.fpsText.setText(game.time.fps + ' FPS');
    }
      //  If the sprite is > 8px away from the pointer then let's move to it

   this.player.update();
 
    if(this.player.shooting){
    	this.player.shoot();
    }else{
    	this.player.stopShoot();
    }
 //check for overlap between player ship - enemy bullets  and calculate damage 
  game.physics.arcade.overlap(this.enemy_bullets, this.player.sprite, this.playerDamaged, null, this);
 //check for overlap between player ship - enemy ship and calculate damage
 game.physics.arcade.overlap(this.player.sprite, this.enemies, this.enemyTouched, null, this)
 //check for overlap between enemy ship - player bullets and calculate score and damage (call enemyDamaged)
 game.physics.arcade.overlap(this.enemies, this.player_bullets,this.enemyDamaged, null, this);
 //check for overlap between enemy ship and invisible line drawn from the player. If it overlaps, enemy shoots
 game.physics.arcade.overlap(this.enemies, this.invisible_line, this.enemyShoot, null, this);
//controls

		game.input.onDown.add(this.player.shoot,this.player);
		game.input.onUp.add(this.player.stopShoot,this.player);

},

render: function(){

   
},


addEnemy: function(){
	
	var enemy=new Enemy(game);
	this.enemies.add(enemy);
	   
	//enemy.rateOfFire=250;

	// enemy=enemies.getFirstDead();
	//  enemy.reset(x,y);
	//  enemy.health=3;
	// enemy.body.velocity.y=40;
	// enemy.checkWorldBounds=true;
 //     enemy.outOfBoundsKill= true;
	
},

playerDamaged: function(player,bullet){
	bullet.kill();
	
	player.damage(bullet.damage); 
	console.log(bullet.damage);
	if (!player.alive){
		this.invisible_line.kill();
		game.state.start('menu');
	}
	//console.log(player);
	//calculate how much damage the player took 
	//call removeLife if needed
},

enemyTouched: function(player,enemy){

	//damage enemy for spesific amount
	enemy.damage(1);
	//damage player for specific amount 
	player.damage(1)
	//console.log('touched')
	//call removeLife if needed

},
enemyDamaged: function(enemy,bullet){

	bullet.kill();
	//console.log('hit');
	//console.log(enemy);

	//damage enemy
	enemy.damage(bullet.damage);
	
//increase score
score+=this.player.weapon.damage;

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

playerStopShoot: function(){
	this.player.shooting=false;
},

enemyShoot: function(x,enemy){
	
 if (enemy.lastTimeFired < game.time.now - enemy.weapon.rateOfFire) {
 	if(this.enemy_bullets.countDead()==0){
 	//	console.log('new bullet');
		var bullet=new Bullet(game,enemy.x+40,enemy.y+59,'enemy')
		// var bullet=enemy_bullets.getFirstDead();
		bullet.checkWorldBounds=true;
		bullet.outOfBoundsKill= true;
		bullet.damage=enemy.weapon.damage;
		// bullet.reset(enemy.x+40,enemy.y+59);
			// bullet.body.velocity.y=400;
	this.enemy_bullets.add(bullet)
	 }else{
		var bullet=this.enemy_bullets.getFirstDead();
	 	bullet.reset(enemy.x+40,enemy.y+59,'enemy');
	 	bullet.body.velocity.y=400;
	 	
	// 	  game.physics.arcade.enable(bullet);
	// 	bullet.body.velocity=400;
		bullet.checkWorldBounds=true;
	    bullet.outOfBoundsKill= true;
	    bullet.damage=enemy.weapon.damage;
	//     console.log('old bullet');
	 }
	    enemy.lastTimeFired = game.time.now;
	    // console.log('alive enemy bullets: '+ enemy_bullets.countLiving());
	    // console.log('dead enemy bullets: '+ enemy_bullets.countDead());
	  }

},

removeLife: function(){

//remove a life 
//check if any life left else gameover

},

gameOver: function(){

},



};