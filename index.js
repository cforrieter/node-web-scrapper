var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var href, type;

request('http://substack.net/images/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);
    var host = response.connection._host;
    var file = fs.createWriteStream('images.csv')
    $('tr').each(function(i, row){
      href = host + $(row).find('a').attr('href')
      type = href.split('.').pop()
      file.write($(row).find('code').first().text() + ",");
      file.write(href + ",")
      file.write(type + "\n")
    });
    file.end();
  }
})