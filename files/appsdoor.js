const params = getParams($argument);

const url = "https://gofans.cn/limited/ios";

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
};

$httpClient.get({ url: url, headers: headers }, function (error, response, body) {
  if (error) {
    console.log("获取应用信息失败:", error);
    $done();

    return;
  }

  const appList = parseAppList(body);

  const freeAppList = appList.filter((app) => app.price === "Free");

  let panelContent = "";

  const appCount = parseInt(params.appCount) || 8;

  for (let i = 0; i < freeAppList.length && i < appCount; i++) {
    const app = freeAppList[i];
    const description = truncateDescription(app.description, 30);

    panelContent += `🆓${app.name}｜原价￥${app.originalPrice}\n`;
  }

  const panel = {
    title: "AppStore限免APP",
    content: panelContent,
    icon: params.icon,
    "icon-color": params.color,
    appCount: params.appCount
  };

  $done(panel);
});

function parseAppList(html) {
  const regex = /<div[^>]+class="column[^"]*"[^>]*>[\s\S]*?<strong[^>]+class="title[^"]*"[^>]*>(.*?)<\/strong>[\s\S]*?<b[^>]*>(.*?)<\/b>[\s\S]*?<div[^>]+class="price-original[^"]*"[^>]*>[^<]*<del[^>]*>(.*?)<\/del>[\s\S]*?<p[^>]+class="intro[^"]*"[^>]*>([\s\S]*?)<\/p>/g;
  const appList = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const name = match[1];
    const price = match[2];
    const originalPrice = parseFloat(match[3]).toFixed(1);
    const description = match[4].replace(/<.*?>/g, "").replace(/\n+/g, " ").trim();

    appList.push({
      name: name,
      price: price,
      originalPrice: originalPrice,
      description: description,
    });
  }

  return appList;
}

function truncateDescription(description, maxLength) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "…";
  }
  return description;
}


function getParams(param) {
  return Object.fromEntries(
    param
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
