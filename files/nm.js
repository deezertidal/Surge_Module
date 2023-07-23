const params = getParams($argument);

const songCount = params.songCount || 8;
const url = 'https://music.163.com/discover/toplist?id=3778678';
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
};

$httpClient.get({ url: url, headers: headers }, function(error, response, body) {
  if (error) {
    console.log('请求失败:', error);
    $done();
    return;
  }

  const songList = extractSongList(body);
  if (songList.length > 0) {
    let panelContent = '';
    for (let i = 0; i < songList.length && i < songCount; i++) {
      const { name, artist } = songList[i];
      panelContent += `${i + 1}.${name}🎧${artist}\n`;
    }

    const panel = {
      title: '网易云热歌榜',
      content: panelContent,
      songCount: params.songCount,
      icon: params.icon,
      "icon-color": params.color
    };

    $done(panel);
  } else {
    const panel = {
      title: '网易云热歌榜',
      content: 'No songs found',
      songCount: params.songCount,
      icon: params.icon,
      "icon-color": params.color
    };

    $done(panel);
  }
});

function extractSongList(html) {
  const match = html.match(/<textarea id="song-list-pre-data".*?>(.*?)<\/textarea>/);
  if (match) {
    const songListData = match[1];
    const songList = JSON.parse(songListData);
    return songList.map((song) => {
      const name = song.name || "Unknown";
      const artist = song.artists && song.artists.length > 0 ? song.artists[0].name : "Unknown";
      return { name, artist };
    });
  }
  return [];
}

function getParams(param) {
  return Object.fromEntries(
    param
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
