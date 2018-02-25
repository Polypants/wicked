var gameOver = {
  create: function() {
    this.gameOver = game.add.sprite(0, 0, 'gameOver');
    
    this.stars = game.add.sprite(0, 0, 'stars');
    this.stars.animations.add('stars', [0, 1, 2, 3, 4, 5], 12, true);

    this.moon = game.add.sprite(0, 0, 'moon');
  },
  update: function() {
    this.stars.animations.play('stars');
  }
};
