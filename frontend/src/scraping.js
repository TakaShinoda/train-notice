const puppeteer = require('puppeteer');

(async () => {
    // Puppeteerの起動.
    const browser = await puppeteer.launch({
      headless: false, // Headlessモードで起動するかどうか.
      slowMo: 50, // 指定のミリ秒スローモーションで実行する.
    });
  
    // 新しい空のページを開く.
    const page = await browser.newPage();
 
    // view portの設定.
    await page.setViewport({
        width: 1200,
        height: 800,
    });
    
    // 秀和システムのページへ遷移.
    await page.goto('https://www.keio.co.jp/', {
        waitUntil: 'domcontentloaded'
    })

    // 複数のURLにアクセスするときはこれを使って短期間に大量のアクセスをしないようにする
    await page.waitForTimeout(1000); // 1秒
    
    // id="topAnnounce" の要素の表示を待つ.
    await page.waitForSelector('#topAnnounce');
    
    // 要素の取得.
    const topAnnounce = await page.evaluate((selector) => {
        // evaluateメソッドに渡す第1引数のfunctionは、第2引数として渡したパラメータをselectorに引き継いでブラウザ内で実行する。
        return document.querySelector(selector).innerHTML;
    }, '#topAnnounce');
    
    console.log(topAnnounce);
    
    
    // ブラウザの終了.
    await browser.close();

})();