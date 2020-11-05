//app for scrapping the webpage of hackernews
const axios = require('axios')
const cheerio = require('cheerio')
var fs = require('fs');

const url = 'https://news.ycombinator.com';

axios.get(url)
    .then(response => {
        getData(response.data);
        //console.log(response.data);
    })
    .catch(error =>{
        console.log(error);
    })

let getData = html =>{
    data = [];
    const $ = cheerio.load(html);
    $('table.itemlist tr td:nth-child(3)').each((i, elem) =>{
        data.push({
            title : $(elem).text(),
            link : $(elem).find('a.storylink').attr('href')
        });
    });

    console.log(data);
    fs.writeFile('output.json', JSON.stringify(data, null, 2), function(err){
        console.log("File successfully written");
    })
}