let express = require('express')
let app = express()
const puppeteer = require('puppeteer');

// CORSを許可する
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/search', (req, res) => {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://google.com');
        await page.type('.gLFyf', 'テスト');
        await page.evaluate(() => {
            document.querySelector('.gNO89b').click();
        });
        await page.waitForNavigation();
        await page.screenshot({path: __dirname + '/public/screenshot.png'});
        await browser.close();
        res.sendFile(__dirname + '/public/screenshot.png');
        })();
});

app.listen(3000, () => {
    console.log("Server started");
})