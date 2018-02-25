var game = new Phaser.Game(160, 144, Phaser.CANVAS, 'screen');
// the game variable is initiated

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('level1', level1State);
game.state.add('gameOver', gameOver);
// the states are added to be started later

game.state.start('boot');
// the boot state is started
