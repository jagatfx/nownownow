var d3    = require('d3');
var cloud = require('d3-cloud');

var fill = d3.scale.category20();
var sites = require('./scrape/data/sites.json');
var occ = require('./scrape/data/counts.json');

var layout = cloud()
    .size([800, 800])
    .words(
      occ[0]
      .map(function(d, ind) {
      return {text: d, size: 10 + 15*occ[1][ind]};
    }))
    .padding(5)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font('Impact')
    .fontSize(function(d) { return d.size; })
    .on('end', draw);

layout.start();

function draw(words) {
  d3.select('div#word-cloud').append('svg')
      .attr('width', layout.size()[0])
      .attr('height', layout.size()[1])
    .append('g')
      .attr('transform', "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll('text')
      .data(words)
    .enter().append('text')
      .style('font-size', function(d) { return d.size + "px"; })
      .style('font-family', 'Impact')
      .style('fill', function(d, i) { return fill(i); })
      .attr('text-anchor', 'middle')
      .attr('transform', function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
  d3.select('div#intro').text('Scraped '+occ[0].length+' words from '+sites.length+' /now sites');
  sites.forEach(function(site) {
    d3.select('ul#site-list').append('li').text(site);
  });
}
