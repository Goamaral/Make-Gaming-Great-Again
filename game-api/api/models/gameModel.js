'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  name: {
    type: String,
    Required: 'Enter name of player'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  score: {
    type: String,
    Required: 'Enter a score'
  }
});

module.exports = mongoose.model('Scores', ScoreSchema);
