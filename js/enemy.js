var Enemy = function (game){
	this.sprite=null
	
 }

Enemy.prototype={

preload: function(){
    game.load.image('enemy_ship', 'assets/enemy_ship.png');
	game.load.image('enemy_ship_2', 'assets/enemy_ship_2.png');

},

createEnemy : function(){


},
addEnemy: function(type){
	var state=game.state.callbackContext;
	this.x=((Math.random() * 400)+1); ;
	this.y=-100;

	this.selectedEnemy=this.selectEnemy();
	
	
	if(state.enemies.countDead()==0){
		
		this.sprite=game.add.sprite(this.x,this.y,this.selectedEnemy.key);
		console.log('peos');
	}else{
		console.log('yolo');
		this.sprite=game.state.callbackContext.enemies.getFirstDead();
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
	this.sprite.body.velocity.y=(Math.random() * 200)+1;
	this.sprite.weapon=new Weapon(this.selectedEnemy.weapon);
	game.state.callbackContext.enemies.add(this.sprite);
	
},

selectEnemy: function(){
	var numberOfEnemies=3
	var randomNumber=Math.round((Math.random()*numberOfEnemies));
	var selectedEnemy;
	switch (randomNumber){
		case 1:
		selectedEnemy={
			health:10,
			weapon:'typeTwo',
			key:'enemy_ship'
		}
		break;
		default:
		selectedEnemy={
			health:3,
			weapon:'typeZero',
			key:'enemy_ship_2'
		}
		break;

	}
	return selectedEnemy;

},
update: function(){
	
},

shoot: function(x,enemy){
	

	if (enemy.alive && enemy.lastTimeFired < game.time.now - enemy.weapon.rateOfFire) {
			

		var bullet=new Bullet(game,enemy.x,enemy.y+59,enemy.weapon,'enemy')
		enemy.lastTimeFired=game.time.now;

	}
},

damaged: function(enemy,bullet){
	var state=game.state.getCurrentState();
//increase score

score+=bullet.damage;
	scoreText.text='Score: '+score;
	bullet.kill();
	
	//damage enemy
	enemy.damage(bullet.damage);
	if(!enemy.alive){
	state.emitter.x = enemy.x;
    state.emitter.y = enemy.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    state.emitter.start(false, 500, 40, 10);
	}
	


},
 
touched: function(player,enemy){
	this.state=game.state.getCurrentState();
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

