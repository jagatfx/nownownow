function countFilteredOccurrences(wordList, callback) {
  var words = [], counts = [], prev;

  wordList.sort();
  for ( var i = 0; i < wordList.length; i++ ) {
    var val = wordList[i].toLowerCase().replace(/['´’\$\?\-"\%\&]/g, '');
    if(val.length < 2) {
      continue;
    }
    var banned = ['a', 'on', 'i', 'and', 'the', 'with', 'to', 'my', 'for', 'as', 'of', "im", 'it', 'be',
    'are', 'its', 'have', 'that', 'there', 'by', 'is', 'has', 'this', 'me', 'you', 'if', 'at', 'so', 'but',
    'into', 'intp', 'in', 'ive', 'ill', 'au', 'à', 'les', 'un', '&', 'le', 'que', 'la', 'am', 'se', 'or', 'en', 'es',
    '$1', 'we', 'ce', 'fi', 'ii', 'il', 'jr', 'st', 'id', 'he', 'his', 'hers', 'et', 'sa', 'nous', 'us',
    'ses', 'nc', 'an', 'had', 'wp', 'ces', 'da', 'zu', 'sur', 'als', 'ob', 'ist', 'des', 'su', 'http', 'https',
    'di', 'lo', '1a'];
    if ((!isNaN(parseFloat(val)) && isFinite(val)) || banned.indexOf(val) > -1) {
      continue;
    } else if ( val !== prev ) {
        words.push(val);
        counts.push(1);
    } else {
        counts[counts.length-1]++;
    }
    prev = val;
  }

  callback(null, [words, counts]);
}

exports.countFilteredOccurrences = countFilteredOccurrences;
