var isEnterTouchButtonDown = false;

var menuState = {
  // the menu state, or title screen shows the games name and a 'press start' hint

  create: function() {
    // the create function is run once, each time the file is loaded, automatically

    this.i = 0;
    // initilizes an index value for the phrame number

    this.direction = 0;
    // used for the direction of the clouds movement

    this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.enterKey.onDown.addOnce(this.start, this);

    var enterTouchButton = document.getElementById('enter');
    enterTouchButton.addEventListener("mousedown", function(){
      isEnterTouchButtonDown = true;
    });

    // creates a one-time event listener for enter key. It calls the 'start' function at the end of the page

    this.stars = game.add.sprite(0, 0, 'stars');
    this.wicked = game.add.sprite(0, 0, 'wicked');
    this.cloud1 = game.add.sprite(0, 0, 'cloud1');
    this.cloud2 = game.add.sprite(0, 0, 'cloud2');
    this.moon = game.add.sprite(0, 0, 'moon');
    this.pressEnter = game.add.sprite(game.world.width - 107, game.world.height - 35, 'pressEnter');
    // these add all of the sprites to the scene

    this.pressEnter.animations.add('pressEnter', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76], 25, true);
    // creates the animation for the 'press enter' hint

    this.stars.animations.add('stars', [0, 1, 2, 3, 4, 5], 12, true);
    // creates the animation for the stars

    this.music = game.sound.play('menuSong');
    // add music to menu
  },
  update: function() {
    this.i++;
    // adds one to 'i', the frame iterator

    if ( isEnterTouchButtonDown ) {
      this.start();
    }

    this.pressEnter.animations.play('pressEnter');
    this.stars.animations.play('stars');
    // these start the animations

    if (this.i % 10 === 0) {
      if (this.cloud1.x === -30) {
        this.direction = 1;
      }
      if (this.cloud1.x === 0) {
        this.direction = 0;
      }
      if (this.direction === 0) {
        this.cloud1.x--;
        this.cloud2.x++;
      }
      if (this.direction === 1) {
        this.cloud1.x++;
        this.cloud2.x--;
      }
    }
    // moves the clouds back and fourth
  },
  start: function() {
    isEnterTouchButtonDown = false;
    game.state.start('level1');
  }
};
