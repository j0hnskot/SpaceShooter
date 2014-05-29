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
this.newHighScore;
this.previousHighScore;
this.bossWarning;

}

game_state.prototype={
preload: function(){

	// game.scale.setShowAll();
	// game.scale.setScreenSize();
	// this.player.preload();
	// this.enemy.preload();
	// this.powerUp.preload();
	
  //   game.load.image('pipe-bot','assets/pipe-bot.png');
  //    game.load.image('scoreWall','assets/scoreWall.png');
  //   game.load.audio('jump', 'assets/jump.ogg'); 

},


create: function() {
	//start physics
	this.currentExplosion=0;
	this.spawners=[];
	this.explosionPool=[];
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
	this.invisible_line=game.add.sprite(0,0,'');
	this.invisible_line.anchor.set(0.5,1);
	this.invisible_line.scale.y=850;
	this.player.sprite.addChild(this.invisible_line);
	
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

	this.hud.enabled=true;
	this.hud.create();

	this.hud.fpsEnabled=true;
	//score=1000;
	this.startSpawningEnemies();

	// game.input.onDown.add(this.player.shoot,this.player);
	// 	game.input.onUp.add(this.player.stopShoot,this.player);	
	this.bossWarning=game.add.text(game.width/2, game.width/2+100, '       --WARNING-- \n -INCOMMING BOSS-', { font: '32px Arial', fill: '#fff' });
	this.bossWarning.alpha=0;
	this.bossWarning.anchor.set(0.5);
	 this.pause_label = game.add.text(game.width - 100, game.height-40, 'Pause', { font: '24px Arial', fill: '#fff' });
    this.pause_label.inputEnabled = true;
    this.pause_label.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        game.paused = true;        
        // And a label to illustrate which menu item was chosen. (This is not necessary)
        this.choiseLabel = game.add.text(game.width/2, game.height/2, '--PAUSED--', { font: '40px Arial', fill: '#fff' });
        this.choiseLabel.anchor.setTo(0.5, 0.5);
    });
   game.input.onDown.add(this.unpause, self);
    
},
unpause: function(event){
	if(game.paused){
		  this.choiseLabel.destroy();
		  game.paused=false;
	}

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
    //  this.enemies.forEachAlive(this.renderBody,this);
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
	
	
},
addEnemyFormation: function(){
this.enemy.addEnemyFormation(game.rnd.integerInRange(2, 8), game.rnd.integerInRange(100, 200));

},

addSpawner: function(){
	var timer;
	if(this.spawners.length>10){
		this.addBoss();
	}else{
		this.spawners.push(timer=game.time.events.loop(4500-score/2, function(){this.addEnemy()}, this));
		


	}
	
},

addBoss: function(){

	this.spawners.forEach(function(timerEvent){
		timerEvent.timer.remove(timerEvent);
	});
	this.spawners=[];
	this.enemy.killAll();
	var tween=game.add.tween(this.bossWarning).to( {alpha:1}, 1000, Phaser.Easing.Linear.None)
				 .to({alpha:0.5},500,Phaser.Easing.Linear.None,false,500)
				.to({alpha:1},500,Phaser.Easing.Linear.None,false,500)
				.to({alpha:0},500,Phaser.Easing.Linear.None,false,500)
				.start();
	this.timer=game.time.events.add(4000,function(){this.addEnemy('boss')},this);
	//this.timer.start();
},

afterBattleMenu: function(){
	var oldScore=parseInt(localStorage.getItem('highscore'));
	var newRecord=false;
	if(oldScore<score){
		localStorage.setItem('highscore',score);
		newRecord=true;
	}
	

	this.credits=Math.round(parseInt(localStorage.getItem('credits'))+(score/2));

	
	 localStorage.setItem('credits',this.credits);
	this.menu=game.add.sprite(game.width/2,game.height/2,'window');
	this.menu.anchor.setTo(0.5,0.5);
	
	this.previousHighScore=game.add.text(this.menu.x-this.menu.width/2+20,this.menu.y-200,'HighScore :'+ oldScore,{fontSize:'32px',fill:'#c1bcbc'});
	this.finalScore=game.add.text(this.menu.x-this.menu.width/2+20,this.menu.y-100,'Score :'+ score,{fontSize:'32px',fill:'#c1bcbc'});
	if(newRecord){
		this.newHighScore=game.add.text(this.menu.x-this.menu.width/2+20,this.menu.y-50,'New record!',{fontSize:'20px',fill:'#c1bcbc'});
	
	}

	this.creditsAwarded=game.add.text(this.menu.x-this.menu.width/2+20,this.menu.y,'Credits won: '+Math.round(score/2),{fontSize:'32px',fill:'#c1bcbc'});

	this.menu_button=game.add.sprite(this.menu.x,this.menu.y+this.menu.width/2+50,'menu_button');
	this.menu_button.anchor.setTo(0.5,0.5);
	this.menu_button.inputEnabled=true;
	this.menu_button.events.onInputDown.add(function(){

	  game.add.tween(this.restart_game_button).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	   game.add.tween(this.menu_button).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.menu).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.previousHighScore).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.finalScore).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.creditsAwarded).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	 if(newRecord){game.add.tween(this.newHighScore).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true)};
	this.timer = game.time.create();
	
	this.timer.add(2000,function(){	game.state.start('menu');}, this);
	this.timer.start();	
	},this);

	this.restart_game_button=game.add.sprite(this.menu.x,this.menu.y+this.menu.width/2,'restart_game_button');
	this.restart_game_button.anchor.setTo(0.5,0.5);
	this.restart_game_button.inputEnabled=true;
	this.restart_game_button.events.onInputDown.add(function(){

	  game.add.tween(this.restart_game_button).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	   game.add.tween(this.menu_button).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.menu).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.previousHighScore).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.finalScore).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	  game.add.tween(this.creditsAwarded).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	 if(newRecord){game.add.tween(this.newHighScore).to( { alpha: 0}, 1000, Phaser.Easing.Linear.None, true)};
	this.timer = game.time.create();
	
	this.timer.add(2000,function(){	game.state.start('game');}, this);
	this.timer.start();	
	},this);



},





removeLife: function(){



},

gameOver: function(){

},



};