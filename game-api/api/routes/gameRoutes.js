'use strict';
module.exports = function(app) {
  var game = require('../controllers/gameController');

  // Game Routes
  app.route('/scores')
    .get(game.list_all_scores)
    .post(game.create_a_score);

  app.route('/scores/:scoreId')
    .get(game.read_a_score);
};
