# Description
#   A Hubot script that returns slideshare presentations
#
# Configuration:
#   None
#
# Commands:
#   hubot slideshare <user> - user's presentations
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  request = require 'request-b'
  cheerio = require 'cheerio'

  robot.respond /slideshare (\S+)$/i, (res) ->
    user = res.match[1]
    baseUrl = 'http://www.slideshare.net'
    url = "#{baseUrl}/#{user}/presentations"
    request(url).then (r) ->
      $ = cheerio.load r.body
      slides = []
      $('#slideshows ul.thumbnailFollowGrid li a').each ->
        e = $ @
        url = baseUrl + e.attr('href')
        title = e.attr('title')
        slides.push { url, title }
      message = slides.map (i) ->
        "#{i.title} #{i.url}"
      .join '\n'
      res.send message
