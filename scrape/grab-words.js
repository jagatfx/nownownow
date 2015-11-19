var fs      = require("fs");
var async   = require('async');
var cheerio = require('cheerio');
var needle  = require('needle');

function grabWords(sites, callback) {
  var options = {
    follow_max         : 5,
    rejectUnauthorized : true
  };
  var wordList = [];
  async.eachSeries(sites, function iterator(site, done) {
    console.log('Now processing: '+site+' ...');
    needle.get(site, options, function(err, response) {
      if (!err && response.statusCode == 200) {
        var data = response.body;
        var $ = cheerio.load(data);
        var words = $('article').text();
        if (words.length < 50) {
          words += $('content').text();
        }
        var cur = words.split(/[\n\r\s\=\(\)\+\[\]\:\!\.\,\;\\\/]/).filter(Boolean);
        wordList = wordList.concat(cur);
        done();
      } else {
        console.error('Got error while grabbing: '+err+' Skipping...');
        done();
      }
    });
  }, function(err) {
    // console.log(wordList);
    if (err) {
      callback(err);
    } else {
      callback(null, wordList);
    }
  });
}

function saveToFile(input, outputFilename, callback) {
  fs.writeFile(outputFilename, JSON.stringify(input), function(err) {
    if (err) {
      callback(err);
    } else {
      callback(null, input);
    }
  });
}

exports.grabWords = grabWords;
exports.saveToFile = saveToFile;
