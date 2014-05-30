Hud = function (game){
	
	this.call=game.state.callbackContext;
	this.fpsText
	this.enabled=false;
	this.fpsEnabled=false;
	this.healthText;
	this.shieldText;
	this.state;

 }

Hud.prototype={



create : function(){
	this.state=game.state.getCurrentState();
if(game.state.current==='game' && this.enabled){
	score=0;
	//create life bar
	this.healthText=game.add.text(16,game.height-40,'Health: '+this.state.player.sprite.health,{fontSize:'32px',fill:'#ffffff'});
	this.healthText.alpha=0.5;

	this.shieldText=game.add.text(216,game.height-40,'Shield: '+this.state.player.powerUp.shield,{fontSize:'32px',fill:'#ffffff'});
	this.shieldText.alpha=0.5;

	scoreText = game.add.text(game.width/2, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });
	scoreText.alpha=0.5;
	scoreText.anchor.set(0.5);
	//fps
	  game.time.advancedTiming = true;
   		this.fpsText = game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );

}



},

update: function(){
	if(this.enabled){
	//	scoreText.text = 'Score: ' + score; 
	//	healthText.text='Health: ' +game.state.callbackContext.player.sprite.health;
		if (game.time.fps !== 0 && this.fpsEnabled) {
			this.fpsText.setText(game.time.fps + ' FPS');
		}
	}


},

updateHealth: function(){
	if(this.enabled){

		var health=this.state.player.sprite.health;
		var shield=this.state.player.powerUp.shield;
		if(health<0){health=0};
		if(shield<0){shield=0}


		this.healthText.text='Health: '+health;
		this.shieldText.text='Shield: '+shield;
	}
},
 


};


// Enemy.prototype = Object.create(Phaser.Sprite.prototype);
// Enemy.prototype.constructor = Enemy;

// Enemy.prototype.setWeapon = function(weapon){

//  	this.weapon=new Weapon(weapon);
//  };