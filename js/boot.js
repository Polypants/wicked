var bootState = {
  // the boot state sets up the very basics of a phaser game and stuff that will need to be set for every file afterward.

  create: function() {
    // the create function is run once, automatically

    game.physics.startSystem(Phaser.Physics.ARCADE);
    // sets the physics style

    game.stage.backgroundColor = "222";
    // sets the background color

    game.state.start('load');
    // starts the load state
  }
};
