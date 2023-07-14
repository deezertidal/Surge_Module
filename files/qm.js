params = getParams($argument);

const songCount = params.songCount || 8;
const url = 'https://y.qq.com/n/ryqq/toplist/26';
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

$httpClient.get({ url: url, headers: headers }, function(error, response, body) {
  if (error) {
    console.log('请求失败:', error);
    $done();
    return;
  }

  const pattern = /<a class="songlist__cover".*?title="(.*?)".*?<\/a>.*?<a title="(.*?)".*?href=".*?".*?<\/a>.*?<a class="playlist__author".*?>(.*?)<\/a>/g;
  let matches;
  let panelContent = '';
  let count = 1;

  while ((matches = pattern.exec(body)) !== null && count <= songCount) {
    const songName = matches[2];
    const artistName = matches[3];
    panelContent += `${count}.${songName}🎧${artistName}\n`;
    count++;
  }

  const panel = {
    title: 'QQ音乐热歌榜',
    content: panelContent,
     songCount: params.songCount,
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
