var game_state=function(game){


this.player_bullets;
this.enemies;
this.enemy_bullets;
this.isRunning=false;
this.timer;
this.spawnTime=1500;
this.playerHealth=5;
this.fpsText;
this.finalScore;
this.creditsAwarded;
this.player=new Player(game);
this.enemy=new Enemy(game);
this.hud=new Hud(game);
this.powerUp=new Powerup(game);
this.weapon=new Weapon();
this.types;
this.emitter;
this.menu;
this.numberOfSpawners=1;
this.spawners;
this.bossFight;
this.currentExplosion;
this.explosionPool=[];

}

game_state.prototype={
preload: function(){

	game.scale.setShowAll();
	game.scale.setScreenSize();
	this.player.preload();
	this.enemy.preload();
	this.powerUp.preload();
	game.load.image('player_bullet', 'assets/player_bullet.png');
	game.load.image('enemy_bullet', 'assets/enemy_bullet.png');
	game.load.image('background', 'assets/background.png');
	game.load.image('background_layer_2', 'assets/background_layer_2.png');
	game.load.image('explosion0', 'assets/explosion0.png');
	game.load.image('explosion1', 'assets/explosion1.png');
	game.load.image('explosion2', 'assets/explosion2.png');
  //   game.load.spritesheet('bird', 'assets/birdsheet.png',34,24);
 	  game.load.image('start_game_button','assets/start_game_button.png');
 	  game.load.image('window', 'assets/menu/window.png');
  //   game.load.image('pipe-bot','assets/pipe-bot.png');
  //    game.load.image('scoreWall','assets/scoreWall.png');
  //   game.load.audio('jump', 'assets/jump.ogg'); 

},


create: function() {
	//start physics
	this.currentExplosion=0;
	this.spawners=[];
	this.bossFight=false;
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.world.setBounds(0, -100, 600, 900);
	//create score
	
	
	//create background
	background=game.add.tileSprite(0, 0,480,1280 ,'background');
	 background.autoScroll(0,20);
	 this.background1=game.add.tileSprite(0,0,480,800,'background_layer_2');
	 this.background1.autoScroll(10,100);
	//create player ship
	this.player.create();
	//game.add.existing(this.player);
	this.enemy.create();
	
	

		//create player bullet group
	this.player_bullets=game.add.group();

	
	
	//create player invisible line 
	this.invisible_line=game.add.sprite(0,-100,'');
	this.invisible_line.scale.y=850;
	
	game.physics.arcade.enable(this.invisible_line);
	//create enemy ship group
	this.enemies=game.add.group();
	this.enemies.createMultiple(20,'enemy_ship');
	//create power up group

	this.powerUps=game.add.group();
	this.powerUps.createMultiple(10,'');
	this.powerUp.create();
	//call the power up's random creation timer
	
	//enemy spawn timer 

	


	//create enemy bullet group
	this.enemy_bullets=game.add.group();
	// enemy_bullets.enableBody=true;
	// enemy_bullets.createMultiple(200,'');
	
	//create effects for firing ,damage and death

	for (var e = 0; e < 10; e++) {
		var emitter = game.add.emitter(0, 0, 10);
		/* ... your emitter setup here ... */
		emitter.makeParticles(['explosion0','explosion1','explosion2'],0,10);
		emitter.gravity=0;

		//emitter.lifespan=2000;
		emitter.minRotation = 0;
		emitter.setAlpha(0.1, 0.1)
		emitter.maxRotation = 0;
		emitter.maxParticleSpeed=1;
		this.explosionPool.push(emitter);
	}
	// this.emitter = game.add.emitter(300,200, 100);
 //    this.emitter.makeParticles(['explosion0','explosion1','explosion2']);
 //    this.emitter.gravity=0;
    
 //    this.emitter.lifespan=2000;
 //    this.emitter.minRotation = 0;
 //      this.emitter.setAlpha(0.1, 0.1)
 //    this.emitter.maxRotation = 0;
 // 	this.emitter.maxParticleSpeed=1;
   
       // this.emitter.start(false, 1000, 50, 30);

	//create sounds for firing ,damage and death

	//create music

	//score 
	this.types=this.weapon.getAllTypes();
	console.log(this.types);
	this.hud.enabled=true;
	this.hud.create();

	this.hud.fpsEnabled=true;

	this.startSpawningEnemies();

	// game.input.onDown.add(this.player.shoot,this.player);
	// 	game.input.onUp.add(this.player.stopShoot,this.player);	

  
    
},

update: function() {

// 	this.emitter.forEachAlive(function(particle)
// {
//     particle.alpha = game.math.clamp(particle.lifespan / 1000, 0, 1);
// }, this);

      //  If the sprite is > 8px away from the pointer then let's move to it
   this.hud.update();
   this.player.update();
   this.enemy.update();
 
 //check for overlap between player ship - enemy bullets  and calculate damage 
  game.physics.arcade.overlap(this.enemy_bullets, this.player.sprite, this.player.damaged, null, this.player);
 //check for overlap between player ship - enemy ship and calculate damage
 game.physics.arcade.overlap(this.player.sprite, this.enemies, this.player.touched, null, this.player)
 //check for overlap between enemy ship - player bullets and calculate score and damage (call enemyDamaged)
 game.physics.arcade.overlap(this.enemies, this.player_bullets,this.enemy.damaged, null, this.enemy);
 //check for overlap between enemy ship and invisible line drawn from the player. If it overlaps, enemy shoots
 game.physics.arcade.overlap(this.enemies, this.invisible_line, this.enemy.shoot, null, this.enemy);
  game.physics.arcade.overlap(this.enemies, this.invisible_line, this.player.shoot, null, this.player);
//check for overlap between player ship and powerUps 
game.physics.arcade.overlap(this.player.sprite, this.powerUps, this.powerUp.apply, null, this.powerUp);
//controls

		

},

render: function(){
 
  
    // pipes.forEachAlive(renderBody,this);
     // this.enemies.forEachAlive(this.renderBody,this);
     // this.game.debug.body(this.player.sprite);

},
renderBody: function(obj){

    this.game.debug.body(obj);
},

startSpawningEnemies: function(){
	console.log('started spawning');
	this.spawners=[];
	this.spawners.push(timer=game.time.events.loop(4500, function(){this.addEnemy()}, this));
		this.spawners.push(timer=game.time.events.loop(12000, function(){this.addEnemyFormation()}, this));
		this.spawners.push(timer=game.time.events.loop(20000,this.addSpawner,this));

},

addEnemy: function(type){
	
	//var enemy=new Enemy(game);
	

	this.enemy.addEnemy(type);
	console.log('added enemy')
	
},
addEnemyFormation: function(){
this.enemy.addEnemyFormation(game.rnd.integerInRange(2, 8), game.rnd.integerInRange(100, 200));

},

addSpawner: function(){
	var timer;
	if(this.spawners.length>1){
		this.addBoss();
	}else{
		this.spawners.push(timer=game.time.events.loop(4500, function(){this.addEnemy()}, this));
		console.log('spawner added');
		console.log(this.spawners.length);


	}
	
},

addBoss: function(){
	console.log('adding boss');
	this.spawners.forEach(function(timerEvent){
		timerEvent.timer.remove(timerEvent);
	});
	this.spawners=[];
	this.enemy.killAll();
	this.timer=game.time.events.add(4000,function(){this.addEnemy('boss')},this);
	//this.timer.start();
},

afterBattleMenu: function(){
	console.log('menu');
	this.credits=Math.round(parseInt(localStorage.getItem('credits'))+(score/2));

	
	 localStorage.setItem('credits',this.credits);
	
	this.menu=game.add.sprite(game.width/2,game.height/2,'window');
	this.menu.anchor.setTo(0.5,0.5);
	this.finalScore=game.add.text(this.menu.x-this.menu.width/2+20,this.menu.y,'Score :'+ score,{fontSize:'32px',fill:'#ffffff'});
	this.creditsAwarded=game.add.text(this.menu.x-this.menu.width/2+20,this.menu.y+30,'Credits won: '+Math.round(score/2),{fontSize:'32px',fill:'#ffffff'});

	this.button=game.add.sprite(this.menu.x,this.menu.y+this.menu.width/2,'start_game_button');
	this.button.anchor.setTo(0.5,0.5);
	this.button.inputEnabled=true;
	this.button.events.onInputDown.add(function(){

	  game.add.tween(this.button).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.menu).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.finalScore).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.creditsAwarded).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	this.timer = game.time.create();
	console.log(this.timer);
	this.timer.add(2000,function(){	game.state.start('game');}, this);
	this.timer.start();	
	},this);



},





removeLife: function(){



},

gameOver: function(){

},



};