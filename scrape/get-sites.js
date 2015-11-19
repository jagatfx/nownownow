var cheerio = require('cheerio');
var needle  = require('needle');

function getSites(callback) {
  var nownownowUrl = 'http://nownownow.com';
  var options = {
    follow_max         : 5,
    rejectUnauthorized : true
  };
  needle.get(nownownowUrl, options, function(err, response) {
    if (!err && response.statusCode == 200) {
      var data = response.body;
      var $ = cheerio.load(data);
      var sites = [];
      $('li a').each(function(i, elem) {
        var link = $(this).attr('href');
        if (link.indexOf('http') > -1) {
          sites.push(link);
        }
      });
      callback(null, sites);
    } else {
      callback(err);
    }
  });
}

// For debugging
// getSites(function(err, sites) {
//   console.log(sites);
// });

exports.getSites = getSites;
