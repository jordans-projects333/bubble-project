// === Server ===
const request = require("request")
const cheerio = require("cheerio")
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer")
const ejs = require('ejs');
const path = require('path')
const server = express()
server.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 3000
const cors = require("cors")
server.use(cors())

server.set('views', path.join(__dirname, '/public'));
server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.render("index")
})

// server.get('/', (req, res) => {
//     res.send('hello')
// })

// === Body Parser Middleware ===
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
// === Send message Api ===
const from = "Vonage APIs"
const Nexmo = require('nexmo')
const nexmo = new Nexmo({
    apiKey: "410ca40a",
    apiSecret: "DVPtMg9zFH6dgxj4",
})

// Sends data if requested containing data.js object items
const { data } = require("./data.js")
Object.keys(data).forEach((i, index) => {
    server.get(`/item${index}`, (req, res) => {
        res.json(data[i])
    })
    server.get(`/product${index}`, (req, res) => {
        res.render('product', {
            name: data[i].name,
            image: data[i].image,
            price: data[i].price,
            category: data[i].category
        })
    });
})
server.get("/length", (req, res) => {
    res.json(Object.keys(data).length)
})

// Webscraping salesNumber from Etsy
request("https://www.etsy.com/shop/BeyondBasicBubbles#reviews", (error, response, html) => {
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html)
        const salenumber = $(".shop-sales-reviews")
        output = salenumber.children(".wt-text-caption").text()
        server.get("/salesnumber", (req, res) => {
            res.json(output)
        })
    }
})

// server.post('/send', (req, res) => {
//     console.log(req.body.phoneNumber)
//     const to = req.body.phoneNumber
//     const text = req.body.message
//     // nexmo.message.sendSms(from, to, text)
    
//     const output = `
//         <p>I am testing emailing</p>
//         <h3>Begin test</h3>
//         <ul>
//             <li>Name: ${req.body.message}</li>
//         </ul>
//     `;
//     const options = {
//         from: "jordanroberts333@icloud.com",
//         to: "sarah.burdett93@gmail.com",
//         subject: "Test email",
//         html: output
//         // text: "test 2"
//     }
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         service: "icloud",
//         auth: {
//             user: "jordanroberts333icloud.com",
//             pass: "li",
//         },
//     });

//     // send mail with defined transport object
//     transporter.sendMail(options, (err, info)=>{
//         if(err){
//             console.log(err)
//             return
//         }
//         console.log("sent: "+info.response)
//     });
// })
// 447984858002


// const output = `
// <p>I am testing emailing</p>
// <h3>Begin test</h3>
// <ul>
//     <li>Name: Jordan</li>
// </ul>
// `;
// const options = {
// from: "jordanroberts654@outlook.com",
// to: "sarah.burdett93@gmail.com",
// subject: "Milk please",
// // html: output
// text: "go get milk"
// }
// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
// service: "outlook",
// auth: {
//     user: "jordanroberts654@outlook.com",
//     pass: "Jaws12345",
// },
// });

// // send mail with defined transport object
// transporter.sendMail(options, (err, info)=>{
// if(err){
//     console.log(err)
//     return
// }
// console.log("sent: "+info.response)
// });
// ====================================
server.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)});