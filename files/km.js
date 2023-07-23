const params = getParams($argument);

const songCount = params.songCount || 8;
const url = 'https://m.kugou.com/rank/info/8888list?json=true';
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

$httpClient.get({ url: url, headers: headers }, function (error, response, body) {
  if (error) {
    console.log('请求失败:', error);
    $done();
    return;
  }

  const result = JSON.parse(body);
  const songs = result.songs.list;

  let panelContent = '';

  for (let i = 0; i < Math.min(songCount, songs.length); i++) {
    const song = songs[i];
    const authorName = song.authors[0].author_name;
    const songName = song.songname;

    panelContent += `${i + 1}.${songName}🎧${authorName}\n`;
  }

  const panel = {
    title: '酷狗音乐热歌榜',
    content: panelContent,
	icon: params.icon,
	"icon-color": params.color,
	songCount: params.songCount
  };

  $done(panel);
});

function getParams(param) {
  return Object.fromEntries(
    param
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
