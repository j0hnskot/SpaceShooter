var Enemy = function (game){
	this.sprite=null
	this.state;
	this.currentBoss;
	this.numberOfEnemies;
	this.numberOfBosses;
	this.tweenTimer;
 }

Enemy.prototype={

preload: function(){
    game.load.image('enemy_ship', 'assets/enemy_ship.png');
	game.load.image('enemy_ship_2', 'assets/enemy_ship_2.png');
	game.load.image('enemy_ship_3', 'assets/enemy_ship_3.png');
	game.load.image('enemy_ship_4', 'assets/enemy_ship_4.png');
	game.load.image('enemy_ship_5', 'assets/enemy_ship_5.png');
	game.load.image('boss_1', 'assets/boss_1.png');

},

create: function(){
	this.state=game.state.getCurrentState();
	this.numberOfEnemies=5;
	this.numberOfBosses=1;
},

createEnemy : function(){


},
addEnemyFormation: function(number,velocity){
	randomNumber=game.rnd.integerInRange(1, this.numberOfEnemies);
	randomY=game.rnd.integerInRange(100,300 );
	randomX=Math.round(Math.random()*1);
	if (randomX==0){
		randomX=-50;
		side=-1;

	}else{
		randomX=500;
		side=1;
	}
	for(var i=1;i<=number;i++){
		game.time.events.add(1000+(i*500+velocity), 
			function(){this.addEnemy(randomNumber,randomX,randomY,velocity,true)}, this);
		//this.addEnemy(randomNumber,randomX+((30*i)*side),randomY,velocity,true);

	}

},
addEnemy: function(type,x,y,velocity,formation){
	//var state=game.state.callbackContext;
	if(type=='boss'){
		this.selectedEnemy=this.selectBoss();
		this.x=game.width/2;
		this.y=-100;

	}else if(typeof(type)==='undefined'){
		this.selectedEnemy=this.selectEnemy();
		this.x=((Math.random() * 400)+1); 
		this.y=-100;

	}else{
		this.selectedEnemy=this.selectEnemy(type);
		this.x=x;
		this.y=y;
	}
	
	
		
	
	
	if(this.state.enemies.countDead()==0){
		
		this.sprite=game.add.sprite(this.x,this.y,this.selectedEnemy.key);
		
	}else{
		
		this.sprite=this.state.enemies.getFirstDead();
		this.sprite.loadTexture(this.selectedEnemy.key);
		this.sprite.reset(this.x,this.y);
	
	}
	
	this.sprite.anchor.set(0.5);
	
	this.sprite.alive=true;
	this.sprite.health=this.selectedEnemy.health;
	this.sprite.lastTimeFired=0;
	this.sprite.mountPoints=this.selectedEnemy.mountPoints;
	

	game.physics.arcade.enable(this.sprite);
	this.sprite.checkWorldBounds=true;
	this.sprite.outOfBoundsKill=true;
	this.sprite.body.setSize(this.sprite.width/1.3,this.sprite.height/1.5,0,-this.sprite.height/6.5)
	this.sprite.body.velocity.y=this.selectedEnemy.velocity;
	this.sprite.weapon=new Weapon(this.selectedEnemy.weapon);
	
	if(this.selectedEnemy.isBoss){
		this.currentBoss=this.sprite;
		this.state.bossFight=true;
		this.addTween(this.currentBoss,true);
		
		
	}
	if(formation==true){
		this.sprite.body.velocity.y=velocity;
		game.physics.arcade.moveToXY(this.sprite,-x,this.sprite.y+100, velocity);
	
	}
	this.state.enemies.add(this.sprite);
	
},

selectEnemy: function(number){
	
	var randomNumber;
	if(typeof(number)==='undefined'){

		randomNumber=game.rnd.integerInRange(1, this.numberOfEnemies);
		
	}else{
		randomNumber=number;
	}
	
	var selectedEnemy;
	var randomVelocity=game.rnd.integerInRange(100, 200);
	switch (randomNumber){
		case 1:
		selectedEnemy={
			health:10,
			weapon:'typeTwo',
			key:'enemy_ship',
			velocity: randomVelocity,
			mountPoints:{
				ammount:1,
				point1:{
					x:0,
					y:0,
				},
				
			},


		}
		break;
		case 2:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_2',
			velocity:randomVelocity,
			mountPoints:{
				ammount:1,
				point1:{
					x:0,
					y:0,
				},
				
			},


		}
		break;

		

		case 3:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_3',
			velocity:randomVelocity,
			mountPoints:{
				ammount:2,
				point1:{
					x:-10,
					y:0,
				},
				point2:{
					x:10,
					y:0,
				},
			},

		}
		break;

		case 4:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_4',
			velocity:randomVelocity,
mountPoints:{
				ammount:2,
				point1:{
					x:-45,
					y:0,
				},
				point2:{
					x:40,
					y:0,
				},
			},

		}
		break;

		case 5:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_5',
			velocity:randomVelocity,
mountPoints:{
				ammount:2,
				point1:{

					x:-14,
					y:-20,
				},
				point2:{
					x:12,
					y:-20,
				},
			},

		}
		break;
		default:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_2',
			velocity:randomVelocity,
	mountPoints:{
				ammount:2,
				point1:{
					x:-10,
					y:0,
				},
				point2:{
					x:10,
					y:0,
				},
			},

		}
		break;

	}
	
	return selectedEnemy;

},

selectBoss: function(){

	var randomNumber=game.rnd.integerInRange(1, this.numberOfBosses);
	var selectedEnemy;
	switch (randomNumber){
		case 1:
		selectedEnemy={
			health:100,
			weapon:'typeTwo',
			key:'boss_1',
			velocity:0,
			mountPoints:{
				ammount:3,
				point1:{
					x:-45,
					y:0,
				},
				point2:{
					x:40,
					y:0,
				},
				point3:{
					x:0,
					y:0,
				},
			},
		}

		break;
		default:
			console.log('boss index out of range');
		break;

	}
	selectedEnemy.isBoss=true;
	return selectedEnemy;


},
addTween: function(sprite,firstTween){
	// var tween;
	// var tween2;

	var tween3;
	var tween;

	// var tween1=game.add.tween(sprite).to( { y:300}, 2000, Phaser.Easing.Linear.None)
	//  .to({y:100},2000,Phaser.Easing.Linear.None);

	 
	// var tween2=game.add.tween(sprite.body).to( { x:100}, 2000, Phaser.Easing.Linear.None,false,1000)
	// 	.to({x:300},2000,Phaser.Easing.Linear.None,false,1000)
	// 	.to({x:200},2000,Phaser.Easing.Linear.None,false,1000);
	
	//tween1.onComplete.add(function(){tween2.start()}, this);
	
	if(firstTween){
		var tween1=game.add.tween(sprite).to( { y:500}, 2000, Phaser.Easing.Linear.None)
		.to({y:100},2000,Phaser.Easing.Linear.None);

		tween1.start()
		this.tweenTimer = game.time.create();
		
		this.tweenTimer.loop(10000,function(){this.addTween(this.currentBoss)}, this);
		this.tweenTimer.start();

	}
	else{
		
		game.tweens.removeAll();
		var randomNumber=game.rnd.integerInRange(3,3);
		switch(randomNumber){
			case 1:
			console.log('tween'+ randomNumber);
				 tween=game.add.tween(sprite).to( { y:200}, 1000, Phaser.Easing.Linear.None)
				.to({x:600},500,Phaser.Easing.Linear.None,false,500)
				.to({x:0},1000,Phaser.Easing.Linear.None,false,300)
				.to({x:600},1000,Phaser.Easing.Linear.None,false,300)
				.to({x:0},1000,Phaser.Easing.Linear.None,false,300)
				.to({x:600},1000,Phaser.Easing.Linear.None,false,300)
				.to({x:game.width/2},1000,Phaser.Easing.Linear.None,false)
				.to({y:100},500,Phaser.Easing.Linear.None,false,500)
				.start();

				break;

			case 2:
			console.log('tween'+ randomNumber);
				 tween=game.add.tween(sprite).to( { y:-100}, 1000, Phaser.Easing.Linear.None,false,500)
				.to({y:600},1000,Phaser.Easing.Linear.None,false,500)
				.to({x:0},1000,Phaser.Easing.Linear.None,false,500)
				.to({y:100},1000,Phaser.Easing.Linear.None,false,0)
				.to({x:game.width/2},500,Phaser.Easing.Linear.None,false,500)
				.start();

				break;

			case 3:
				console.log('tween'+ randomNumber);
				tween=game.add.tween(sprite).to( { y:-100}, 2000, Phaser.Easing.Linear.None,false,1000)
				.to({y:700},2000,Phaser.Easing.Linear.None,false,1000)
				.to({y:100},2000,Phaser.Easing.Linear.None,false,1000)
				.start();

				tween=game.add.tween(sprite).to( {x:-10}, 2000, Phaser.Easing.Linear.None,false,1000)
				.to({x:300},2000,Phaser.Easing.Linear.None,false,1000)
				.to({x:game.width/2},2000,Phaser.Easing.Linear.None,false,1000)
				.start();
				break;

			case 4:
				console.log('tween'+ randomNumber);
				tween=game.add.tween(sprite).to( { y:-100}, 2000, Phaser.Easing.Linear.None,false,1000)
				.to({y:300},1000,Phaser.Easing.Linear.None,false,500)
				.to({y:600},1000,Phaser.Easing.Linear.None,false,500)
				.to({y:300},1000,Phaser.Easing.Linear.None,false,500)
				.to({y:100},1000,Phaser.Easing.Linear.None,false,500)
				.start();

				tween=game.add.tween(sprite).to( {x:game.width/2}, 2000, Phaser.Easing.Linear.None,false,1000)
				.to({x:600},1000,Phaser.Easing.Linear.None,false,500)
				.to({x:game.width/2},1000,Phaser.Easing.Linear.None,false,500)
				.to({x:0},1000,Phaser.Easing.Linear.None,false,500)
				.to({x:game.width/2},1000,Phaser.Easing.Linear.None,false,500)
				.start();
				break;

			default:
				console.log('boss tween out of range');
				break;


		}
		
	}

	//tween1.onComplete(tween2.start());
	

	  // tween2=game.add.tween(sprite.body).to( { y:500}, 2000, Phaser.Easing.Linear.None)
	  // .start();

	// tween.chain(tween2=game.add.tween(sprite.body).to( { x:0}, 2000, Phaser.Easing.Linear.None, true));
	 //tween.chain(tween3=game.add.tween(sprite.body).to( { x:480}, 2000, Phaser.Easing.Linear.None, true,0,0,true));
	
},

update: function(){
	if(this.state.bossFight){
		if(this.currentBoss.alive && this.state.player.sprite.alive){
			

		}else{
			this.state.bossFight=false;
			this.tweenTimer.destroy();
			game.tweens.removeAll();

			if(this.state.player.sprite.alive){
				this.state.startSpawningEnemies();
			}
		}
	}
	
},

shoot: function(x,enemy){
	var bullet;
	var currentPoint;

	if (enemy.alive && enemy.lastTimeFired < game.time.now - enemy.weapon.rateOfFire) {
		for(var i=1;i<=enemy.mountPoints.ammount;i++){
			currentPoint=enemy.mountPoints['point'+i];
			
			if(this.state.enemy_bullets.getFirstDead()){

				bullet=this.state.enemy_bullets.getFirstDead();
				bullet.resetProperties(enemy.x+(currentPoint.x),enemy.y+currentPoint.y+59,enemy.weapon,'enemy');
			}else{
				bullet=new Bullet(game,enemy.x+currentPoint.x,enemy.y+currentPoint.y+59,enemy.weapon,'enemy')
			}
		}

		
	

	//	var bullet=new Bullet(game,enemy.x,enemy.y+59,enemy.weapon,'enemy')
		enemy.lastTimeFired=game.time.now;

	}
},

damaged: function(enemy,bullet){
	
//increase score

score+=bullet.damage;
	scoreText.text='Score: '+score;
	bullet.kill();
	
	//damage enemy
	enemy.damage(bullet.damage);
	if(!enemy.alive){
		this.explode(enemy);
	// 	this.state.emitter.kill()
	// this.state.emitter.x = enemy.x;
 //    this.state.emitter.y = enemy.y;

 //    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
 //    //  The second gives each particle a 2000ms lifespan
 //    //  The third is ignored when using burst/explode mode
 //    //  The final parameter (10) is how many particles will be emitted in this single burst
 //    this.state.emitter.start(false, 500, 40, 10);
	}
	


},

explode: function(enemy) {
  // first get an explosion from the pool
  var emitter = this.state.explosionPool[this.state.currentExplosion];

  // place the emitter position at the enemy's position via Point.copyFrom
  emitter.position.copyFrom(enemy.position);
  emitter.start(false, 500, 40, 10);
  // increase currentExplosion by 1, ensuring it wraps around back to 0
  // when it reaches the length of the pool array
  this.state.currentExplosion = 
  				Phaser.Math.wrap(this.state.currentExplosion + 1, 0, this.state.explosionPool.length);
},
 
touched: function(player,enemy){
	
	//damage enemy for spesific amount
	enemy.damage(1);
	//damage player for specific amount 
	player.damage(1)
	this.state.hud.updateHealth();
	if (!player.alive){
		this.state.player.dead();
	}

	

},

killAll:function(){
	while(this.state.enemies.getFirstAlive()){
		var enemy=this.state.enemies.getFirstAlive();
		enemy.kill();
		
		this.explode(enemy);

	}
},


};

