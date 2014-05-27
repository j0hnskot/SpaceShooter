var Enemy = function (game){
	this.sprite=null
	this.state;
	this.currentBoss;
	this.numberOfEnemies;
	this.numberOfBosses;
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
	randomNumber=Math.round((Math.random()*this.numberOfEnemies));
	randomY=Math.random()*300;
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
		this.x=game.world.width/2;
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
		console.log('peos');
	}else{
		console.log('yolo');
		this.sprite=this.state.enemies.getFirstDead();
		this.sprite.loadTexture(this.selectedEnemy.key);
		this.sprite.reset(this.x,this.y);
	//	console.log('revived');
	}
	
	this.sprite.anchor.set(0.5);
	
	this.sprite.alive=true;
	this.sprite.health=this.selectedEnemy.health;
	this.sprite.lastTimeFired=0;
	game.physics.arcade.enable(this.sprite);
	this.sprite.checkWorldBounds=true;
	this.sprite.outOfBoundsKill=true;
	this.sprite.body.setSize(this.sprite.width/1.3,this.sprite.height,0,-this.sprite.height/4)
	this.sprite.body.velocity.y=this.selectedEnemy.velocity;
	this.sprite.weapon=new Weapon(this.selectedEnemy.weapon);
	
	if(this.selectedEnemy.isBoss){
		this.currentBoss=this.sprite;
		this.state.bossFight=true;
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

		randomNumber=Math.round((Math.random()*this.numberOfEnemies));
	}else{
		randomNumber=number;
	}
	
	var selectedEnemy;
	var randomVelocity=(Math.random() * 200)+1;
	switch (randomNumber){
		case 1:
		selectedEnemy={
			health:10,
			weapon:'typeTwo',
			key:'enemy_ship',
			velocity: randomVelocity,

		}
		break;
		case 1:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_2',
			velocity:randomVelocity,
		}
		break;

		case 2:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_2',
			velocity:randomVelocity,
		}
		break;

		case 3:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_3',
			velocity:randomVelocity,
		}
		break;

		case 4:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_4',
			velocity:randomVelocity,
		}
		break;

		case 5:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_5',
			velocity:randomVelocity,
		}
		break;
		default:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_2',
			velocity:randomVelocity,
		}
		break;

	}
	
	return selectedEnemy;

},

selectBoss: function(){

	var randomNumber=Math.round((Math.random()*this.numberOfBosses));
	var selectedEnemy;
	switch (randomNumber){
		case 1:
		selectedEnemy={
			health:100,
			weapon:'typeTwo',
			key:'boss_1',
			velocity:10,
		}
		break;
		default:
		selectedEnemy={
			health:100,
			weapon:'typeZero',
			key:'boss_1',
			velocity:10,
		}
		break;

	}
	selectedEnemy.isBoss=true;
	return selectedEnemy;


},
update: function(){
	if(this.state.bossFight){
		if(this.currentBoss.alive && this.state.player.sprite.alive){
			console.log(	this.currentBoss.health);
			
		}else{
			this.state.bossFight=false;
			if(this.state.player.sprite.alive){
				this.state.startSpawningEnemies();
			}
		}
	}
	
},

shoot: function(x,enemy){
	var bullet;

	if (enemy.alive && enemy.lastTimeFired < game.time.now - enemy.weapon.rateOfFire) {
		
			if(this.state.enemy_bullets.getFirstDead()){
			bullet=this.state.enemy_bullets.getFirstDead();
			bullet.resetProperties(enemy.x,enemy.y+59,enemy.weapon,'enemy');
		}else{
			bullet=new Bullet(game,enemy.x,enemy.y+59,enemy.weapon,'enemy')
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
		this.state.emitter.kill()
	this.state.emitter.x = enemy.x;
    this.state.emitter.y = enemy.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    this.state.emitter.start(false, 500, 40, 10);
	}
	


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


};

