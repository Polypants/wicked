var isWalkingLeft = false;
var isWalkingRight = false;

var isLeftTouchButtonDown = false;
var isRightTouchButtonDown = false;
var isUpTouchButtonDown = false;
var isEnterTouchButtonDown = false;

var level1State = {
  // the game world state

  create: function() {
    // the create function is run once, each time the file is loaded, automatically

    // KEYBOARD BUTTONS ///////////////////////////////////////////////////////////////////////////

    this.cursors = game.input.keyboard.createCursorKeys();
    this.Wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.Akey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.Dkey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // creates event listeners for the A, D, W keys and arrow keys

    var leftTouchButton = document.getElementById('left');
    leftTouchButton.addEventListener("mousedown", function(){
      isLeftTouchButtonDown = true;
    });
    leftTouchButton.addEventListener("mouseup", function(){
      isLeftTouchButtonDown = false;
    });
    leftTouchButton.addEventListener("mouseleave", function(){
      isLeftTouchButtonDown = false;
    });
    leftTouchButton.addEventListener("touchstart", function(){
      isLeftTouchButtonDown = true;
    });
    leftTouchButton.addEventListener("touchend", function(){
      isLeftTouchButtonDown = false;
    });

    var rightTouchButton = document.getElementById('right');
    rightTouchButton.addEventListener("mousedown", function(){
      isRightTouchButtonDown = true;
    });
    rightTouchButton.addEventListener("mouseup", function(){
      isRightTouchButtonDown = false;
    });
    rightTouchButton.addEventListener("mouseleave", function(){
      isRightTouchButtonDown = false;
    });
    rightTouchButton.addEventListener("touchstart", function(){
      isRightTouchButtonDown = true;
    });
    rightTouchButton.addEventListener("touchend", function(){
      isRightTouchButtonDown = false;
    });

    var upTouchButton = document.getElementById('up');
    upTouchButton.addEventListener("mousedown", function(){
      isUpTouchButtonDown = true;
    });
    upTouchButton.addEventListener("mouseup", function(){
      isUpTouchButtonDown = false;
    });
    upTouchButton.addEventListener("mouseleave", function(){
      isUpTouchButtonDown = false;
    });
    upTouchButton.addEventListener("touchstart", function(){
      isUpTouchButtonDown = true;
    });
    upTouchButton.addEventListener("touchend", function(){
      isUpTouchButtonDown = false;
    });



    // GAME WORLD RELATED /////////////////////////////////////////////////////////////////////////

    this.i = 0;
    // initializes an index value for the frame number, used for the light flicker animation

    this.damageTimer = 0;

    game.physics.arcade.gravity.y = 250;
    // initilizes the gravity

    game.world.setBounds(0, 0, 960, 144);
    // sets world bounds to the width of 10 blocks at 96 pixels per block (960), and the height of the game view (144)

    // MOON and STARS /////////////////////////////////////////////////////////////////////////////

    this.moon = game.add.sprite(0, 0, 'moon');
    this.stars = game.add.sprite(0, 0, 'stars');
    // adds the moon and stars sprite to the level

    this.stars.animations.add('stars', [0, 1, 2, 3, 4, 5], 12, true);

    this.stars.fixedToCamera = true;
    this.moon.fixedToCamera = true;
    // fixes the moos position to the camera

    this.starsMask = game.add.graphics(0,0);
    // creates masking layer called starsMask and initilizes its location

    this.starsMask.beginFill(0xffffff);
    // sets objects to be drawn on the lightMask layer to black though any color works

    this.starsMask.drawRect(0, 0, 160, 74);
    // this draws a filled circle in the center of the mask and sets its size to 130 pixels

    this.stars.mask = this.starsMask;
    // sets the mask property of platforms and tree to be the lightMask layer

    this.starsMask.fixedToCamera = true;

    // BACKGROUND /////////////////////////////////////////////////////////////////////////////////

    this.tree = game.add.sprite(200, 24, 'tree');

    // PLAYER /////////////////////////////////////////////////////////////////////////////////////

    this.player = game.add.sprite(105, game.world.height - 75, 'walk');
    // creates player and adds player sprite to game

    game.physics.arcade.enable(this.player);
    // enables the phisics engine on the player

    game.camera.follow(this.player);
    // sets the camera to follow the player

    this.player.anchor.setTo(0.5,0.5);
    // sets the players anchor point. This point determins where the sprite will be flipped from

    this.player.body.gravity.y = 300;
    // sets the players weight

    this.player.body.collideWorldBounds = true;
    // prevents the player form walking off the screen

    this.player.animations.add('walk', [4, 1, 2, 3], 7, true);
    // defines the player's waling right animation. The second parameter an array of frame positions in the png file. The third parameter is how quickly the animation runs and the last is a boolean to set if it repeats or not

    // SKULL //////////////////////////////////////////////////////////////////////////////////////

    this.skull = game.add.sprite(500, 25, 'skull');
    this.skull.animations.add('skull', [0, 1, 2, 3, 4, 5, 6], 12, true);
    game.physics.arcade.enable(this.skull);
    this.skull.body.gravity.y = 300;
    this.skull.body.collideWorldBounds = true;
    this.skull.body.height = 15;
    this.skull.anchor.setTo(0.5,0.5);

    // PLATFORMS //////////////////////////////////////////////////////////////////////////////////

    this.platforms = game.add.group();
    // creates a platforms group to allow us to apply some properties to the entire group

    this.platforms.enableBody = true;
    // this makes all the items inside the platforms group to be phisical objects

    for (var i = 0; i < 10; i++) {
      this.platforms.create(i * 96, game.world.height - 64, 'ground_large');
      // this loop creates the ground platforms. The for loop loops through the numbers from 0 to 10 and stores the index value of each loop in the 'i' variable. It uses the index number to multiply the blocks x value to move each ground_large block
    }

    this.platforms.forEach(function(item) {
      // loops through the items inside the platforms group

      item.body.immovable = true;
      item.body.moves = false;
      // prevents each item from being moved
    });

    // LIGHT MASK /////////////////////////////////////////////////////////////////////////////////

    this.lightMask = game.add.graphics(0,0);
    // creates masking layer called lightMask and initilizes its location

    this.lightMask.beginFill(0xffffff);
    // sets objects to be drawn on the lightMask layer to black though any color works

    this.lightMask.drawCircle(0, 0, 130);
    // this draws a filled circle in the center of the mask and sets its size to 130 pixels

    this.tree.mask = this.lightMask;
    this.platforms.mask = this.lightMask;
    this.skull.mask = this.lightMask;
    // sets the mask property of platforms and tree to be the lightMask layer

    // HEARTS /////////////////////////////////////////////////////////////////////////////////////

    this.hearts = game.add.group();
    this.heartsCount = 10;
    this.hearts.fixedToCamera = true;
    this.setHearts();
  },
  // UPDATE FUNCTION ******************************************************************************
  update: function() {
    // the update function runs for each frame

    this.i++;
    // adds one to 'i', the frame iterator

    this.stars.animations.play('stars');
    this.skull.animations.play('skull');

    // DAMAGE /////////////////////////////////////////////////////////////////////////////////////
    if (this.skull.body.x === this.player.body.x 
        && this.player.body.y > 50 
        && this.damageTimer < game.time.now) {
      this.damageTimer = game.time.now + 3000;
      this.heartsCount--;
      this.setHearts();
      // playerTookDamage(); this.player.alpha = 0;
    }

    if (this.heartsCount === 0) {
      game.state.start('gameOver');
    }

    if (this.i % 5 === 0) {
      // this code block runs if the frame iterator is a multiple of 5

      var scaleFactor = 1 + Math.random() * 0.02;
      // creates a variable that will be used to set the lightMask's scale. scale.x and scale.y are always set to 1 initially

      this.lightMask.scale.x =  scaleFactor;
      this.lightMask.scale.y =  scaleFactor;
      // sets the x and y scale of lightMask to the scaleFactor variable
    }

    if ( this.i % 2 === 0 ) {
      // on every other frame
      if ( isWalkingRight ) {
        this.tree.x++;
      }
      if ( isWalkingLeft ) {
        this.tree.x--;
      }
    }

    game.physics.arcade.collide(this.player, this.platforms);
    // prevents the player form passing through the ground

    game.physics.arcade.collide(this.skull, this.platforms);

    this.player.body.velocity.x = 0;
    // stops the players movement when a directional key is not pressed

    this.lightMask.x = this.player.x;
    this.lightMask.y = this.player.y;
    // sets the lightmask to follow the player

    if ( ( this.Akey.isDown || this.cursors.left.isDown || isLeftTouchButtonDown )
      && ( !this.Dkey.isDown || !this.cursors.right.isDown || isRightTouchButtonDown ) ) {

      isWalkingLeft = true;

      this.player.body.velocity.x = -60;
      // move the player sprite to the left

      this.player.animations.play('walk');
      // plays the walk animation

      this.player.scale.x = -1;
      // flips the player sprite

    } else if ( ( this.Dkey.isDown || this.cursors.right.isDown || isRightTouchButtonDown )
      && ( !this.Akey.isDown || !this.cursors.left.isDown || isLeftTouchButtonDown) ) {

      isWalkingRight = true;

      this.player.body.velocity.x = 60;
      // move the player sprite to the right

      this.player.animations.play('walk');
      // plays the walk animation

      this.player.scale.x = 1;
      // flips the player sprite back to its original state

    } else {

      isWalkingLeft = false;
      isWalkingRight = false;

      this.player.animations.stop();
      // stops the walk animation

      this.player.frame = 0;
      // sets the player frame to the initial, standing still frame when not moving
    }
    if ( this.player.body.touching.down === true 
      && ( this.spacebar.isDown || this.Wkey.isDown || this.cursors.up.isDown || isUpTouchButtonDown ) ) {
      // this code block runs if the player is touching something under them and the jump button is down

      this.player.body.velocity.y = -140;
      // move the player upward
    }

    if (this.i % 70 < 20 && this.player.body.x > this.skull.body.x) {
      this.skull.body.velocity.x = 60;
      this.skull.scale.x = -1;
    } else if (this.i % 70 < 20 && this.player.body.x < this.skull.body.x) {
      this.skull.body.velocity.x = -60;
      this.skull.scale.x = 1;
    } else {
      this.skull.body.velocity.x = 0;
    }

    if (this.i % 70 < 10) {
      if (this.player.body.x > this.skull.body.x) {
        this.skull.body.velocity.y = -40;
      }
      if (this.player.body.x < this.skull.body.x) {
        this.skull.body.velocity.y = -40;
      }
      if (this.player.body.x === this.skull.body.x) {
        this.skull.body.velocity.y = 0;
      }
    }

    this.skull.body.x = Math.round(this.skull.body.x);
    this.skull.body.y = Math.round(this.skull.body.y);

    this.player.body.x = Math.round(this.player.body.x);
    this.player.body.y = Math.round(this.player.body.y);
    // this is a trick to getting the player's position to lign up to the grid. This makes sure that blury pixels aren't rendered between frames of movement
  },
  setHearts: function() {
    var iterator = 0;
    // a variable that will be used to set the position of the hears. This was created to be seperate form j, the loop variable because there are some cases when I want the iterator to not be incermented

    this.hearts.removeAll(true);
    // clears the hears of the last frame to be able to then update and replace them

    for (var j = 0; j < 10; j++) {
      // a for loop that creates and renders the hears on the screen

      if (this.heartsCount > j) {
        // if the heartsCount variable, that contans the number of the players remaining hearts, is less than the number of loop iterations then render a full heart and if not render an empty heart

        if (j % 3 === 0) {
          this.hearts.create(6 * iterator + 4, game.world.height - 14, 'heart');
          iterator++;
        } else if (j % 3 === 1){
          this.hearts.create(6 * iterator + 4, game.world.height - 10, 'heart');
          iterator++;
        } else {
          this.hearts.create(6 * iterator - 2, game.world.height - 18, 'heart');
        }
      } else {
        if (j % 3 === 0) {
          this.hearts.create(6 * iterator + 4, game.world.height - 14, 'emptyHeart');
          iterator++;
        } else if (j % 3 === 1){
          this.hearts.create(6 * iterator + 4, game.world.height - 10, 'emptyHeart');
          iterator++;
        } else {
          this.hearts.create(6 * iterator - 2, game.world.height - 18, 'emptyHeart');
        }
      }
    }
  }
};
