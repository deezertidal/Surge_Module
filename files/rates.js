const url = "https://api.exchangerate-api.com/v4/latest/CNY";
const params = getParams($argument);
$httpClient.get(url, function(error, response, data) {
  if (error) {
    $done();
    return;
  }
  const rates = JSON.parse(data).rates;
  const usdToCny = (1 / rates.USD).toFixed(2);
  const cnyToHkd = rates.HKD.toFixed(2);
  const cnyToJpy = rates.JPY.toFixed(2);
  const cnyToKrw = rates.KRW.toFixed(2);
  const eurToCny = (1 / rates.EUR).toFixed(2);
  const gbpToCny = (1 / rates.GBP).toFixed(2);
  const tryToCny = rates.TRY.toFixed(2);
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const content = `
🇺🇸1美元兑换 ${usdToCny}🇨🇳人民币
🇨🇳1人民币兑换 ${cnyToHkd}🇭🇰港币
🇨🇳1人民币兑换 ${cnyToJpy}🇯🇵日元
🇨🇳1人民币兑换 ${cnyToKrw}🇰🇷韩元
🇨🇳1人民币兑换 ${tryToCny}🇹🇷里拉
🇪🇺1欧元兑换 ${eurToCny}🇨🇳人民币
🇬🇧1英镑兑换 ${gbpToCny}🇨🇳人民币
  `;

  const panel = {
    title: `🪙当前汇率信息 ${timestamp}`,
    content: content,
	        icon: params.icon,
        "icon-color": params.color
  };

  $done(panel);
});
function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}