var async = require('async');
var gw    = require('./grab-words');
var pw    = require('./process-words');
var gs    = require('./get-sites');

var sites;

var sitesOutputFilename = './data/sites.json';
var wordsOutputFilename = './data/words.json';
var occOutputFilename = './data/counts.json';

var options = {
  shouldRefreshSiteList: false,
  shouldGrabWords: false
};

async.waterfall([
    options.shouldRefreshSiteList ? gs.getSites : function(callback) {
      sites = require('./data/sites.json');
      callback(null, sites);
    },
    options.shouldRefreshSiteList ? function(sites, callback) {
      gw.saveToFile(sites, sitesOutputFilename, callback);
    } : function(sites, callback) {
      callback(null, sites);
    },
    options.shouldGrabWords ? gw.grabWords : function(sites, callback) {
      var words = require('./data/words.json');
      callback(null, words);
    },
    options.shouldGrabWords ? function(wordList, callback) {
      gw.saveToFile(wordList, wordsOutputFilename, callback);
    } : function(wordList, callback) {
      callback(null, wordList);
    },
    pw.countFilteredOccurrences,
    function(result, callback) {
      gw.saveToFile(result, occOutputFilename, callback);
    }
], function (err, result) {
  if (err) {
    console.error(err);
  }
});
