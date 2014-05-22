Hud = function (game){
	
	this.call=game.state.callbackContext;
	this.fpsText
	this.enabled=true;
	this.fpsEnabled=false;

 }

Hud.prototype={

preload: function(){
    game.load.image('enemy_ship', 'assets/enemy_ship.png');


},

create : function(){
if(game.state.current==='game'){
	score=0;
}
scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });
	//fps
	  game.time.advancedTiming = true;
   		this.fpsText = game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );

},

update: function(){
	if(this.enabled){
		scoreText.text = 'Score: ' + score; 
		if (game.time.fps !== 0 && this.fpsEnabled) {
			this.fpsText.setText(game.time.fps + ' FPS');
		}
	}

},


 


};


// Enemy.prototype = Object.create(Phaser.Sprite.prototype);
// Enemy.prototype.constructor = Enemy;

// Enemy.prototype.setWeapon = function(weapon){

//  	this.weapon=new Weapon(weapon);
//  };