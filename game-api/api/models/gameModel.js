'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  score: {
    type: String,
    Required: 'Please enter a score'
  }
});

module.exports = mongoose.model('Scores', ScoreSchema);
