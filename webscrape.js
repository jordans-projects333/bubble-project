const request = require("request")
const cheerio = require("cheerio")

const url = "https://www.etsy.com/shop/BeyondBasicBubbles#reviews"
request(url, (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html)
        const salenumber = $(".shop-sales-reviews")
        console.log(salenumber.children(".wt-text-caption").text())
    }
})