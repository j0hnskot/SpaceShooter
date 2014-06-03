<!doctype html> 
<html lang="en"> 
<head> 
	<meta charset="UTF-8" />
    <title>Space shooter with the phaser engine</title>
    <script type="text/javascript" src="phaser.min.js"></script>
	<script type="text/javascript" src="game.js"></script>


    
    <style type="text/css">

        body {
            margin: 0;
        }
    </style>
</head>
<body>

<script type="text/javascript">
var background;
var scoreText;
var score=0;
var menu_music;
var preloadSprite=null;

var game = new Phaser.Game(480, 800, Phaser.CANVAS, '',  {preload: preload, create: create});

function preload(){

var text;	
		game.scale.setShowAll();
    game.scale.setScreenSize();
  
   game.load.image('load','load.png');
   game.load.onFileComplete.add(function(q){
   	if(preloadSprite==null){
   	preloadSprite=game.add.image(game.width/2,game.height/2,'load');
   	preloadSprite.anchor.set(0.5);
   	text=game.add.text(game.width/2,game.height/2+100,'Loading..',{fontSize:'32px',fill:'#ffffff'});
   	text.anchor.set(0.5);
   }
  	

   	preloadSprite.width=q*4;
   	});
  	
    
 

 	game.load.audio('shoot', 'laser1.wav');
	game.load.audio('game_music_1', 'game_music_1.ogg');
	game.load.audio('gameover', 'gameover.ogg');
	game.load.audio('menu_music','menu_music.ogg');
	game.load.audio('explosion','explosion2.wav');

    game.load.image('powerup', 'powerup.png');
    game.load.image('window','window.png');
  	game.load.image('close_button','close_button.png');
	game.load.image('shop_button','shop_button.png');
	game.load.image('credits_button','credits_button.png');
	game.load.image('buy_button','buy_button.png');
	game.load.image('equip_button','equip_button.png');
	game.load.image('equipped_button','equipped_button.png');
	game.load.image('typeZero','typeZero.png');
	game.load.image('typeOne','typeOne.png');
	game.load.image('typeTwo','typeTwo.png');
    game.load.image('player_bullet', 'player_bullet.png');
	game.load.image('player_bullet_fast', 'player_bullet_fast.png');
	game.load.image('enemy_bullet', 'enemy_bullet.png');
	game.load.image('background', 'background.png');
	game.load.image('background_layer_2', 'background_layer_2.png');
	game.load.image('explosion0', 'explosion0.png');
	game.load.image('explosion1', 'explosion1.png');
	game.load.image('explosion2', 'explosion2.png');
	game.load.image('start_game_button','start_game_button.png');
	game.load.image('restart_game_button','restart_game_button.png');
	game.load.image('window', 'window.png');
	game.load.image('menu_button', 'menu_button.png');
	game.load.image('player_ship', 'spaceship.png');
	game.load.image('shield', 'shield.png');
	game.load.image('invicibility', 'invicibility.png');
	game.load.image('lowHealth', 'lowHealth.png');
   	game.load.image('enemy_ship', 'enemy_ship.png');
	game.load.image('enemy_ship_2', 'enemy_ship_2.png');
	game.load.image('enemy_ship_3', 'enemy_ship_3.png');
	game.load.image('enemy_ship_4', 'enemy_ship_4.png');
	game.load.image('enemy_ship_5', 'enemy_ship_5.png');
	game.load.image('boss_1', 'boss_1.png');
    game.load.image('menu_background_layer_1','menu_background_layer_1.png');
    game.load.image('menu_background_layer_2','menu_background_layer_2.png');
	game.load.image('start_game_button','start_game_button.png');
	game.load.image('back_button','back_button.png');
	game.load.image('title','title.png')


	
}
function create(){
menu_music=game.add.audio('menu_music');


var timer = game.time.create();
	 timer.loop(500,isDecoded, this);
		timer.start();
game.state.add('menu', menu_state); 
game.state.add('game', game_state); 

//game.state.start('menu');	
}

function isDecoded(){
	if(menu_music.isDecoded){
			preloadSprite.kill()
		game.state.start('menu');

	}
}




</script>

</body>
</html>