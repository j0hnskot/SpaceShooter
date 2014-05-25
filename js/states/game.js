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
this.emitter;
this.menu;


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
	

	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.world.setBounds(0, -100, 480, 900);
	//create score
	
	
	//create background
	background=game.add.tileSprite(0, 0,480,1280 ,'background');
	 background.autoScroll(0,100);
	//create player ship
	this.player.create();
	//game.add.existing(this.player);

	
	

		//create player bullet group
	this.player_bullets=game.add.group();

	
	
	//create player invisible line 
	this.invisible_line=game.add.sprite(0,0,'');
	this.invisible_line.scale.y=800;
	
	game.physics.arcade.enable(this.invisible_line);
	//create enemy ship group
	this.enemies=game.add.group();
	this.enemies.createMultiple(20,'enemy_ship');
	//create power up group
	this.powerUps=game.add.group();
	//call the power up's random creation timer
	this.powerUp.create();
	//enemy spawn timer 
	this.type='ship';
	timer=game.time.events.loop(4500, function(){this.addEnemy(this.type)}, this);
	timer=game.time.events.loop(20000,this.addSpawner,this)
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
	game.input.onDown.add(this.player.shoot,this.player);
		game.input.onUp.add(this.player.stopShoot,this.player);	

  
    
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

		

},

render: function(){
 
  
    // pipes.forEachAlive(renderBody,this);
     this.enemies.forEachAlive(this.renderBody,this);
     this.game.debug.body(this.player.sprite);

},
renderBody: function(obj){

    this.game.debug.body(obj);
},

addEnemy: function(type){
	
	var enemy=new Enemy(game);

	enemy.addEnemy(type);

	
},

addSpawner: function(){
	var timer=game.time.events.loop(4500, function(){this.addEnemy(this.type)}, this);
	console.log('spawner added');
},

afterBattleMenu: function(){
	console.log('menu');
	this.credits=Math.round(parseInt(localStorage.getItem('credits'))+(score/2));

	
	 localStorage.setItem('credits',this.credits);
	
	this.menu=game.add.sprite(game.width/2,game.height/2,'window');
	this.menu.anchor.setTo(0.5,0.5);
	this.button=game.add.sprite(game.width/2,game.height/2,'start_game_button');
	this.button.anchor.setTo(0.5,0.5);
	this.button.inputEnabled=true;
	this.button.events.onInputDown.add(function(){

	  game.add.tween(this.button).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.menu).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
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