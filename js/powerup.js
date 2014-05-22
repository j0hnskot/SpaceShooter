Powerup = function (game){
	this.sprite=null;
	this.call=game.state.callbackContext;
	this.enabled=true;
	this.timer;
	

 }

Powerup.prototype={

preload: function(){
   game.load.image('powerup', 'assets/powerup.png');

},

create : function(){
	this.timer=game.time.events.loop(1000, this.addRandom, this);
},

update: function(){


},

addRandom: function(){
console.log('random added');
this.randomNumber=Math.round(Math.random()*10);
console.log(this.randomNumber);
this.x=((Math.random() * 400)+1); ;
this.y=-10;
	//this.sprite=Phaser.Sprite.call(this, game, this.x, this.y, 'enemy_ship');
	//if(game.state.callbackContext.enemies.countDead()==0){
		this.sprite=game.add.sprite(this.x,this.y,'powerup');
	//}else{

		
	//	console.log('revived');
	
	this.sprite.anchor.set(0.5);
	//this.sprite.scale.setTo(0.5,0.5);
	this.sprite.alive=true;
	game.physics.arcade.enable(this.sprite);
	this.sprite.checkWorldBounds=true;
	this.sprite.outOfBoundsKill=true;
	this.sprite.body.velocity.y=100;
	this.sprite.randomNumber=this.randomNumber;
	game.state.callbackContext.powerUps.add(this.sprite);
	//
},

apply :function(player,powerUp){
	switch (powerUp.randomNumber){
		case 1:
			player.health=500;
			console.log(player.health);
			break;
		default:
			break;

	}
	
	powerUp.kill();
	console.log('applied')
}
 


};


