const url = "https://piaofang.maoyan.com/web-heat";
const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
};
const params = getParams($argument);
$httpClient.get({ url: url, headers: headers }, function(error, response, data) {
  if (error) {
    console.log("请求失败:", error);
    $done();
    return;
  }
  handleResponse(data);
});

function handleResponse(data) {
  const pattern = /<p class="video-name">(.*?)<\/p>[\s\S]*?<p class="web-info">(.*?)<span class="span-right">(.*?)<\/span>/g;
  let matches;
  let panelContent = "";
  let count = 0;

  while ((matches = pattern.exec(data)) !== null && count < 10) {
    const title = matches[1];
    const platform = matches[2];

    panelContent += `[${title}]➡︎${platform}\n`;
    count++;
  }

  const panel = {
    title: "电视热度榜",
    content: panelContent,
    icon:params.icon,
    "icon-color":params.color
  };

  $done(panel);
}
function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}