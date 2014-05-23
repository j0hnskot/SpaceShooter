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
	this.timer=game.time.events.loop(4000, this.addRandom, this);
},

update: function(){


},

addRandom: function(){

this.randomNumber=Math.round(Math.random()*10);

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
		case 2:
		case 3:
		case 4:
		case 5:
			player.health+=10;
			player.powerUpDuration=5000;
			game.state.callbackContext.hud.updateHealth();
			break;
		default:
			break;

	}
	
	powerUp.kill();
	
}
 


};


