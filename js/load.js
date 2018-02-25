var loadState = {
  // the load state loads all of the assets

  preload: function() {
    // the preload function is run once, before the game starts

    game.load.image('ground', 'assets/sand.png');
    game.load.image('moon', 'assets/moon.png');
    game.load.image('cloud1', 'assets/cloud1.png');
    game.load.image('cloud2', 'assets/cloud2.png');
    game.load.image('wicked', 'assets/wicked.png');
    game.load.image('ground_large', 'assets/ground.png');
    game.load.image('tree', 'assets/tree.png');
    game.load.image('heart', 'assets/heart.png');
    game.load.image('emptyHeart', 'assets/emptyHeart.png');
    game.load.image('gameOver', 'assets/gameOver.png');
    // these load the png images

    game.load.spritesheet('walk', 'assets/walk.png', 9, 21);
    game.load.spritesheet('pressEnter', 'assets/pressEnter.png', 54, 11);
    game.load.spritesheet('stars', 'assets/stars.png', 160, 144);
    game.load.spritesheet('skull', 'assets/skull.png', 15, 17);
    // these load the sprite sheets for animations. the 3rd and 4th parameters are a width and height of each frame

  },
  create: function() {
    // the create function is run once, automatically
    game.state.start('menu');
  }
};
