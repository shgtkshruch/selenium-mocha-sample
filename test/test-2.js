const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const assert = require('assert');
const By = webdriver.By;
const until = webdriver.until;
const fs = require('fs');

let t;
let i = 1;
let taskName;
const extension = 'png';

test.describe('Google検索2', () => {
  let driver;

  test.before(() => {
    driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    driver.manage().timeouts().implicitlyWait(3000);
  });

  test.after(() => {
    driver.quit();
  });

  // スクリーンショットを取る
  test.afterEach(done => {
    var filename = taskName;
    driver.takeScreenshot().then(data => {
      fs.writeFile(
        `${i}.${filename}.${extension}`,
        data.replace(/^data:image\/png;base64,/,''),
        'base64',
        (err) => {
          if(err) throw err;
          i++
          done();
        });
    });
  });

  test.it('正しいタイトルが表示される', done => {
    taskName = '検索'
    driver.get('http://www.google.co.jp/');
    driver.findElement(By.name('q')).sendKeys('webdriver');
    driver.findElement(By.id('tsf')).submit();
    driver.wait(until.titleIs('webdriver - Google 検索'), 1000)
    .then(() => {
      return driver.getTitle();
    })
    .then(title => {
      t = title
      assert.equal(title, 'webdriver - Google 検索aaa');
      done();
    });
  });
});

test.describe('テスト間の連携(in file) 2', () => {
  taskName = '変数'
  test.it('変数を受け取る', () => {
    assert(t, 'webdriver - Google 検索');
  });
});


