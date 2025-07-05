const valueRegex = /<a href="..\/(.*?)"/;
const sourceUrl = "https://www.piyao.org.cn/jrpy/index.htm";
const targetUrl = "https://www.piyao.org.cn/";
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
const icon = 'exclamationmark.bubble';
const iconColor = '#E9546B';

$httpClient.get(sourceUrl, function (error, response, data) {
  if (error) {
    const body = {
      title: "获取谣言辟谣内容失败",
      content: String(error),
      icon: icon,
      "icon-color": iconColor,
    };
    $done(body);
  } else {
    const match = data.match(valueRegex);
    if (!match || !match[1]) {
      const body = {
        title: "获取辟谣链接失败",
        content: "未找到有效链接，请检查网页结构是否更改",
        icon: icon,
        "icon-color": iconColor,
      };
      $done(body);
    } else {
      const targetValue = match[1];
      const targetContentUrl = targetUrl + targetValue;

      $httpClient.get(targetContentUrl, function (error, response, data) {
        if (error) {
          const body = {
            title: "获取辟谣内容失败",
            content: String(error),
            icon: icon,
            "icon-color": iconColor,
          };
          $done(body);
        } else {
          const rumorRegex = /谣言：(.*?)<\/strong><\/span><\/p>/;
          const truthRegex = /<strong>真相：<\/strong>(.*?)<\/p>/;

          const rumorMatch = data.match(rumorRegex);
          const truthMatch = data.match(truthRegex);

          if (!rumorMatch || !rumorMatch[1] || !truthMatch || !truthMatch[1]) {
            const body = {
              title: "解析辟谣内容失败",
              content: "网页结构可能已更新，请检查",
              icon: icon,
              "icon-color": iconColor,
            };
            $done(body);
          } else {
            const rumor = rumorMatch[1].replace(/<[^>]+>/g, "").trim();
            const truth = truthMatch[1].replace(/<[^>]+>/g, "").trim();
            const content = `🤔谣言：${rumor}\n🔍真相：${truth}`;
            const body = {
              title: "今日辟谣",
              content: content,
              icon: icon,
              "icon-color": iconColor,
            };
            $done(body);
          }
        }
      });
    }
  }
});
