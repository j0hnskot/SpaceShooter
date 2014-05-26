Hud = function (game){
	
	this.call=game.state.callbackContext;
	this.fpsText
	this.enabled=true;
	this.fpsEnabled=false;
	this.healthText;

 }

Hud.prototype={

preload: function(){
    game.load.image('enemy_ship', 'assets/enemy_ship.png');


},

create : function(){
if(game.state.current==='game'){
	score=0;
	//create life bar
	this.healthText=game.add.text(16,game.height-40,'Health: '+game.state.callbackContext.player.sprite.health,{fontSize:'32px',fill:'#ffffff'});
}

scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
	//fps
	  game.time.advancedTiming = true;
   		this.fpsText = game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );

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
	this.healthText.text='Health: '+game.state.callbackContext.player.sprite.health;
},
 


};


// Enemy.prototype = Object.create(Phaser.Sprite.prototype);
// Enemy.prototype.constructor = Enemy;

// Enemy.prototype.setWeapon = function(weapon){

//  	this.weapon=new Weapon(weapon);
//  };