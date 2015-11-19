function countFilteredOccurrences(wordList, callback) {
  var words = {};
  var prev;

  wordList.sort();
  for ( var i = 0; i < wordList.length; i++ ) {
    var val = wordList[i].toLowerCase().replace(/['´’\$\?\-"\%\&\*\}\{_}]/g, '');
    if(val.length < 2) {
      continue;
    }
    var banned = ['a', 'on', 'i', 'and', 'the', 'with', 'to', 'my', 'for', 'as', 'of', "im", 'it', 'be',
    'are', 'its', 'have', 'that', 'there', 'by', 'is', 'has', 'this', 'me', 'you', 'if', 'at', 'so', 'but',
    'into', 'intp', 'in', 'ive', 'ill', 'au', 'à', 'les', 'un', '&', 'le', 'que', 'la', 'am', 'se', 'or', 'en', 'es',
    '$1', 'we', 'ce', 'fi', 'ii', 'il', 'jr', 'st', 'id', 'he', 'his', 'hers', 'et', 'sa', 'nous', 'us',
    'ses', 'nc', 'an', 'had', 'wp', 'ces', 'da', 'zu', 'sur', 'als', 'ob', 'ist', 'des', 'su', 'http', 'https',
    'di', 'lo', '1a', 'your', 'de', 'com', 'which', 'them', 'their', 'these', 'und', 'ich'];
    if ((!isNaN(parseFloat(val)) && isFinite(val)) || banned.indexOf(val) > -1) {
      continue;
    } else if ( val !== prev ) {
      words[val] = 1;
    } else {
      words[val]++;
    }
    prev = val;
  }

  callback(null, words);
}

exports.countFilteredOccurrences = countFilteredOccurrences;
