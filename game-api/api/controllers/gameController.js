'use strict';

var mongoose = require('mongoose'),
    Score = mongoose.model('Scores');

exports.list_all_scores = function(req, res) {
  Score.find({}, function(err, score) {
    if (err) {
      res.send(err);
    }
    res.json(score);
  });
};

exports.create_a_score = function(req, res) {
  var new_score = new Score(req.body);

  new_score.save(function(err, score) {
    if (err) {
      res.send(err);
    }
    res.json(score);
  });
};

exports.read_a_score = function(req, res) {
  Score.findById(req.params.taskId, function(err, score) {
    if (err) {
      res.send(err);
    }
    res.json(score);
  });
};
