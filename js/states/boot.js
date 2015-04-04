 /**
 * @author      John Skotiniotis <j0hnskot@gmail.com>
 * @copyright   2014 - John Skotiniotis
 * @license     {@link http://choosealicense.com/licenses/mit/ | MIT License}
 * @version     0.0.1
 * @date        21/10/2014
 */

;var SpaceShooter = {

    /* Your game can check App.orientated in internal loops to know if it should pause or not */
    orientated: false,

    helpers: {},

    screens:{},

    States:{},

    GameObj: {},

    selectedLevel: 1,



};

SpaceShooter.States.Boot = function (game) {};

SpaceShooter.States.Boot.prototype = {

    preload: function () {

         this.load.image('load', 'assets/load.png');
        // this.load.image('preloader_bar', 'assets/preloader_bar.png');
        // this.load.image('bar_background', 'assets/bar_background.png');
    },

    create: function () {

			console.log('boot')
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//        if (this.game.device.desktop) {
//            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
//            this.scale.minWidth = 480;
//            this.scale.minHeight = 260;
//            this.scale.maxWidth = 960;
//            this.scale.maxHeight = 640;
//            this.scale.pageAlignHorizontally = true;
//            this.scale.pageAlignVertically = true;
//            this.scale.setScreenSize(true);
//
//        } else  {
//
//            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
//            this.scale.setScreenSize(true);
//        }

        this.state.start('preload');

    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        App.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        App.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};
