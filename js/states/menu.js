SpaceShooter.States.Menu = function(game){}
SpaceShooter.States.Menu.prototype={


	init: function () {

		this.menu_button;
		this.shop_button
		this.shop=new Shop();
		this.credits=new Credits();
		this.menu_objects;
		this.titleImage;
		this.music;
	},

	create: function(){



		if(localStorage.getItem('spaceShooter.firstRun')===null){

			localStorage.setItem('spaceShooter.firstRun','true');
		}

		if(localStorage.getItem('spaceShooter.firstRun')=='true'){

			localStorage.setItem('spaceShooter.firstRun','false');
			localStorage.setItem('gottypeZero','true');
			localStorage.setItem('gottypeOne','false');
			localStorage.setItem('gottypeTwo','false');
			localStorage.setItem('highscore','0');
			localStorage.setItem('equippedWeapon','typeZero');
			localStorage.setItem('credits','0')
			localStorage.setItem('dateCreated',new Date())

		}

		this.menuBackground = game.add.sprite(0, 0,'menu_background_layer_1');
		this.menuBackground2 = game.add.tileSprite(0, 0,480,800,'menu_background_layer_2');
		this.menuBackground2.autoScroll(1,10);

		game.add.tween(this.menuBackground).to( { alpha: 0.9 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		game.add.tween(this.menuBackground2).to( { alpha: 0.3 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		this.menu_objects=game.add.group();

		this.titleImage=game.add.sprite(game.width/2,game.height/2-300,'title');
		this.titleImage.anchor.set(0.5);
		this.menu_objects.add(this.titleImage);
		this.start_button = game.add.button(game.width/2,game.height/2, 'start_game_button', this.startGame,this);
		this.start_button.anchor.setTo(0.5);
		this.menu_objects.add(this.start_button);

		this.shop_button = game.add.button(game.width/2,game.height/2+100, 'shop_button', this.showShop,this);
		this.shop_button.anchor.setTo(0.5);
		this.menu_objects.add(this.shop_button);

		this.credits_button = game.add.button(game.width/2,game.height/2+200, 'credits_button', this.showCredits,this);
		this.credits_button.anchor.setTo(0.5);
		this.menu_objects.add(this.credits_button);


		this.shop.create();
		this.credits.create();

		this.music = game.add.audio('menu_music',1,true);
		this.music.play();


	},

	startGame : function(){


		game.add.tween(this.music).to( { volume:0 }, 300, Phaser.Easing.Linear.None,true);

			var timer = game.time.create();

			 timer.add(500,function(){	game.state.start('game');}, this);
			timer.start();




	},

	shutdown: function(){
		game.sound.remove(this.music);


	},

	showShop: function(){

		this.menu_objects.setAll('visible',false);

		this.shop.showShop();
	},

	showCredits: function(){

		this.menu_objects.setAll('visible',false);

		this.credits.show();
	},

};

