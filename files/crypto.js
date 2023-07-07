let symbols = [
  { symbol: 'BTC', name: '比特币' },
  { symbol: 'ETH', name: '以太坊' },
  { symbol: 'BNB', name: '币安币' },
  { symbol: 'XRP', name: '瑞波币' },
  { symbol: 'ADA', name: '艾达币' },
  { symbol: 'DOGE', name: '狗狗币' },
  { symbol: 'LTC', name: '莱特币' },
  { symbol: 'SOL', name: '索拉纳' },
  { symbol: 'TRX', name: '波场币' }
];

let message = {
  'title': '加密货币汇率',
  'content': '',
  'icon': 'bitcoinsign.circle',
  'icon-color': '#EF8F1C',
};

function handleError(error) {
  if (Array.isArray(error)) {
    console.log(`错误：${error[0]} ${error[1]}`);
    return {
      title: '加密货币汇率',
      content: `错误：${error[0]} ${error[1]}`,
      icon: 'simcard',
      'icon-color': '#CB1B45',
    }
  } else {
    console.log(`错误：${error}`);
    return {
      title: '加密货币汇率',
      content: `错误：${error}`,
      icon: 'simcard',
      'icon-color': '#CB1B45',
    }
  }
}

async function fetchPrice(symbol) {
  return new Promise((resolve, reject) => {
    try {
      const request = {
        url: `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.symbol}USDT`,
      };
      $httpClient.get(request, function (error, response, data) {
        if (error) {
          return reject([`获取${symbol.name}/USDT汇率失败`, error]);
        } else {
          if (response.status === 200) {
            const price = JSON.parse(data).price;
            message.content = `${message.content}${symbol.name}${symbol.symbol}: 💲${Number(price).toFixed(4)}\n`;
          }
          return resolve();
        }
      });
    } catch (error) {
      return reject([`获取${symbol.name}/USDT汇率失败`, error]);
    }
  })
}

(async() => {
  try {
    console.log('⏳ 正在获取加密货币汇率...');
    for (const symbol of symbols) {
      await fetchPrice(symbol);
    }
    message.content = message.content.slice(0, -1);
    $done(message);
  } catch (error) {
    $done(handleError(error));
  }
})();
