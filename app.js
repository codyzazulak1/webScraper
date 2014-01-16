var request = require("request");
var cheerio = require("cheerio");
var path    = require("path");
var url     = 'http://substack.net/images/';
var fs      = require('fs');

request(url, function (error, response, body) {
	var $ = cheerio.load(body);
	var csvExport = [];

	$("td").each( function () {
		var href = url + $(this).find("a").attr("href");
		var code = $(this).find("code").text();
		var a  = $(this).find("a").text();
		var ext = path.extname(a);
		csvExport.push(code + "," + href + "," + ext);
	});

	fs.writeFile("images.csv", csvExport.join("\n"), function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	}); 
});