 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.2
 * @date        14/11/2014
 */

;SpaceShooter.States.Preload = function (game) {};

SpaceShooter.States.Preload.prototype = {

    preload: function () {



			//        // this.splashScreen = this.add.sprite(0, 0, 'splash_screen');
			//        this.splashScreen = entity.create(0,0,'empty_screen').setLabel('.BG');
			//        // this.splashScreen.label='.BG';
			//        this.logo = entity.create(100,200,'logo').setLabel('preloader.logo');
			//
			//        this.preload_background = entity.create(300, this.game.height - 60, 'bar_background')

			//        this.preload_background.scale.setTo(0.4);

			        this.preloadBar = game.add.image(game.width/2,game.height/2,'load');
			//        this.preloadBar.align = false;
			//        this.preloadBar.width = 563;

			//        this.preloadBar.height = this.preload_background.height + 3;
			//    	console.log("Q")


			//  This sets the preloadBar sprite as a loader sprite.
			//  What that does is automatically crop the sprite from 0 to full-width
			//  as the files below are loaded in.
			//        this.load.setPreloadSprite(this.preloadBar);

	var text;
		game.scale.setShowAll();
    game.scale.setScreenSize();

//   game.load.image('load','assets/load.png');
//   game.load.onFileComplete.add(function(q){
//   	if(preloadSprite==null){
//   	preloadSprite=game.add.image(game.width/2,game.height/2,'load');
//   	preloadSprite.anchor.set(0.5);
//   	text=game.add.text(game.width/2,game.height/2+100,'Loading..',{fontSize:'32px',fill:'#ffffff'});
//   	text.anchor.set(0.5);
//   }


//   	this.preloadBar.width=q*4;
//   	});




 	game.load.audio('shoot', 'assets/sound/Laser1.wav');
	game.load.audio('game_music_1', 'assets/sound/game_music_1.ogg');
	game.load.audio('gameover', 'assets/sound/gameover.ogg');
	game.load.audio('menu_music','assets/sound/menu_music.ogg');
	game.load.audio('explosion','assets/sound/explosion2.wav');

	game.load.image('powerup', 'assets/powerup.png');
	game.load.image('window','assets/menu/window.png');
	game.load.image('close_button','assets/menu/close_button.png');
	game.load.image('shop_button','assets/shop_button.png');
	game.load.image('credits_button','assets/credits_button.png');
	game.load.image('buy_button','assets/buy_button.png');
	game.load.image('equip_button','assets/equip_button.png');
	game.load.image('equipped_button','assets/equipped_button.png');
	game.load.image('typeZero','assets/typeZero.png');
	game.load.image('typeOne','assets/typeOne.png');
	game.load.image('typeTwo','assets/typeTwo.png');
	game.load.image('player_bullet', 'assets/player_bullet.png');
	game.load.image('player_bullet_fast', 'assets/player_bullet_fast.png');
	game.load.image('enemy_bullet', 'assets/enemy_bullet.png');
	game.load.image('background', 'assets/background.png');
	game.load.image('background_layer_2', 'assets/background_layer_2.png');
	game.load.image('explosion0', 'assets/explosion0.png');
	game.load.image('explosion1', 'assets/explosion1.png');
	game.load.image('explosion2', 'assets/explosion2.png');
	game.load.image('start_game_button','assets/start_game_button.png');
	game.load.image('restart_game_button','assets/restart_game_button.png');
	game.load.image('window', 'assets/menu/window.png');
	game.load.image('menu_button', 'assets/menu_button.png');
	game.load.image('player_ship', 'assets/spaceship.png');
	game.load.image('shield', 'assets/shield.png');
	game.load.image('invicibility', 'assets/invicibility.png');
	game.load.image('lowHealth', 'assets/lowHealth.png');
	game.load.image('enemy_ship', 'assets/enemy_ship.png');
	game.load.image('enemy_ship_2', 'assets/enemy_ship_2.png');
	game.load.image('enemy_ship_3', 'assets/enemy_ship_3.png');
	game.load.image('enemy_ship_4', 'assets/enemy_ship_4.png');
	game.load.image('enemy_ship_5', 'assets/enemy_ship_5.png');
	game.load.image('boss_1', 'assets/boss_1.png');
	game.load.image('menu_background_layer_1','assets/menu/menu_background_layer_1.png');
	game.load.image('menu_background_layer_2','assets/menu/menu_background_layer_2.png');
	game.load.image('start_game_button','assets/start_game_button.png');
	game.load.image('back_button','assets/back_button.png');
	game.load.image('title','assets/title.png')

    },

    create: function () {
			//
			console.log("PRELOADER: FIX SPLASH SCREEN");
			this.game.state.start("menu");
			return;
			//
        //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.ready = false ;
        this.preloadBar.cropEnabled = false;

//        if(App.CONFIG.debug.skipToGame)this.game.state.start("MainMenu");




    },

    preloadAnimation: function(){
         if (App.ASSETS.soundLoaded() && this.ready == false) {
            this.ready = true;
            console.log("DAFGAKASBDIAHNSIDBASIDIBAIS")

            this.add.tween(this.preloadBar)
            .to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.Out, true);

            this.add.tween(this.splashScreen)
            .to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.Out, true);
            this.add.tween(this.logo)
            .to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.Out, true);

            this.add.tween(this.preload_background)
            .to({
                alpha: 0
            }, 1000, Phaser.Easing.Linear.Out, true)
                .onComplete.add(function () {

                    this.state.start('MainMenu');

                }, this);



        }


    },

    update: function () {
//        this.preloadAnimation();
    }

};
