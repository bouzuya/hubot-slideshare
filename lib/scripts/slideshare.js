// Description
//   A Hubot script that returns slideshare presentations
//
// Configuration:
//   None
//
// Commands:
//   hubot slideshare <user> - user's presentations
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var cheerio, request;
  request = require('request-b');
  cheerio = require('cheerio');
  return robot.respond(/slideshare (\S+)$/i, function(res) {
    var baseUrl, url, user;
    user = res.match[1];
    baseUrl = 'http://www.slideshare.net';
    url = "" + baseUrl + "/" + user + "/presentations";
    return request(url).then(function(r) {
      var $, message, slides;
      $ = cheerio.load(r.body);
      slides = [];
      $('#slideshows ul.thumbnailFollowGrid li a').each(function() {
        var e, title;
        e = $(this);
        url = baseUrl + e.attr('href');
        title = e.attr('title');
        return slides.push({
          url: url,
          title: title
        });
      });
      message = slides.map(function(i) {
        return "" + i.title + " " + i.url;
      }).join('\n');
      return res.send(message);
    });
  });
};
